const {join} = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const {
    NODE_ENV = 'development'
} = process.env;

const IS_DEVELOPMENT = NODE_ENV === 'development';

function commonConfig() {
    return {
        port: 8080,
        publicPath: '/assets/'
    };
}

function createTarget({
    // Target name
    target
}) {
    let {publicPath} = commonConfig();

    /**
     * Root of project
     */
    let root = join(__dirname, '../');

    /**
     * Path for compiled assets
     */
    let dist = join(root, 'dist', target);

    /**
     * Source directory
     */
    let src = join(root, 'src');

    /**
     * Name of output bundles
     */
    let name = IS_DEVELOPMENT
        ? '[name].js'
        : '[hash:16].js';

    let IS_SERVER = target === 'server';
    let IS_CLIENT = target === 'client';

    return {
        root,
        src,
        dist,

        isDevelopment: IS_DEVELOPMENT,

        webpack: {
            name: target,
            entry: join(src, target + '.js'),
            devtool: IS_DEVELOPMENT ? 'cheap-module-eval-source-map' : false,

            mode: NODE_ENV,
            watch: IS_DEVELOPMENT,

            output: {
                path: dist,
                filename: name,
                chunkFilename: name,
                publicPath
            },

            stats: {
                entrypoints: true
            },

            resolve: {
                modules: [
                    'node_modules',
                    'src'
                ]
            },

            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/preset-env',
                                    '@babel/preset-react'
                                ],
                                plugins: [
                                    '@babel/plugin-transform-runtime'
                                ]
                            }
                        }
                    }
                ]
            },

            plugins: [
                new webpack.DefinePlugin({
                    IS_SERVER: JSON.stringify(IS_SERVER),
                    IS_CLIENT: JSON.stringify(IS_CLIENT),
                    'typeof window': JSON.stringify(IS_CLIENT ? 'object' : 'undefined')
                }),

                new webpack.NoEmitOnErrorsPlugin(),

                ...(IS_DEVELOPMENT ? [] : [
                    new UglifyJSPlugin()
                ])
            ]
        }
    };
}

module.exports = {
    commonConfig,
    createTarget
};
