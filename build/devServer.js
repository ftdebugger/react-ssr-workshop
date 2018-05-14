const {join} = require('path');
const express = require('express');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const MemoryFileSystem = require('memory-fs');
const app = express();

const clientConfig = require('./webpack.client');
const serverConfig = require('./webpack.server');
const config = require('./config').commonConfig();

const clientCompiler = webpack(clientConfig);
const serverCompiler = webpack(serverConfig);

const STATS = {
    colors: true,
    hash: false,
    timings: false,
    chunks: true,
    assets: false,
    chunkModules: false,
    modules: false,
    children: true,
    version: false,
    cached: false,
    cachedAssets: false,
    reasons: false,
    source: false,
    errorDetails: false
};

serverCompiler.outputFileSystem = new MemoryFileSystem();

let inProgress = true;
let waitComplete = [];
let clientAssetsMap;
let serverAssetsMap;

function statsToAssets({entrypoints}) {
    return Object.keys(entrypoints).reduce((map, key) => {
        if (!map[key]) {
            map[key] = {};
        }

        entrypoints[key].assets.forEach((file) => {
            let ext = file.split('.').pop();

            if (!map[key][ext]) {
                map[key][ext] = file;
            }
        });

        return map;
    }, {});
}

clientCompiler.hooks.done.tap('DevServer', (stats) => {
    clientAssetsMap = statsToAssets(stats.toJson());
});

serverCompiler.hooks.invalid.tap('DevServer', () => {
    inProgress = true;
});

serverCompiler.hooks.done.tap('DevServer', (stats) => {
    serverAssetsMap = statsToAssets(stats.toJson());

    inProgress = false;

    waitComplete.forEach((cb) => cb());
    waitComplete = [];
});

let serverWatch = serverCompiler.watch({aggregateTimeout: 200}, (err, stats) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server build');
        console.log(stats.toString(STATS));
    }
});

app.get('/favicon.ico', (req, res) => {
    res.redirect('https://yandex.st/lego/_/pDu9OWAQKB0s2J9IojKpiS_Eho.ico');
});

/**
 * If compile in progress - wait
 */
app.use((req, res, next) => {
    if (inProgress) {
        waitComplete.push(next);
    } else {
        next();
    }
});

app.use(devMiddleware(clientCompiler, {
    publicPath: config.publicPath,
    hot: true,

    stats: STATS
}));

app.use(hotMiddleware(clientCompiler, {
    reload: true
}));

app.use((req, res, next) => {
    let serverFs = serverCompiler.outputFileSystem;

    serverFs.readFile(join(serverConfig.output.path, serverAssetsMap.main.js), (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).end();
        } else {
            try {
                let module = {};

                eval(data.toString());

                let middleware = module.exports.default({
                    assets: clientAssetsMap
                });

                middleware(req, res, next);
            } catch(err) {
                console.log(err);
                res.status(500).end();
            }
        }
    });
});

let server = app.listen(config.port, () => {
    console.log(`Dev server started at http://localhost:${config.port}`);
});


['SIGINT', 'SIGTERM'].forEach(function(sig) {
    process.on(sig, function() {
        server.close();
        serverWatch.close();
        process.exit();
    });
});
