const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('./config').createTarget({
    target: 'client'
});

const filter = (arr) => arr.filter(Boolean);

module.exports = {
    ...config.webpack,

    entry: {
        main: filter([
            config.isDevelopment && 'webpack-hot-middleware/client?reload=true',

            config.webpack.entry
        ])
    },

    module: {
        ...config.webpack.module,

        rules: [
            ...config.webpack.module.rules,

            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },

    plugins: [
        ...config.webpack.plugins,

        new MiniCssExtractPlugin({
            filename: config.isDevelopment
                ? '[name].css'
                : '[hash:16].css'

        }),

        new webpack.NamedModulesPlugin(),

        ...(config.isDevelopment ? [
            new webpack.HotModuleReplacementPlugin()
        ] : [])
    ]
};
