module.exports = function (context, options) {
    return {
        name: 'custom-webpack',
        configureWebpack(config, isServer, utils, content) {
            return {
                // module: {
                //     rules: [
                //         {
                //             test: /\.([cm]?ts|tsx)$/,
                //             loader: 'ts-loader',
                //         },
                //     ],
                // },
                experiments: {
                    asyncWebAssembly: true
                },
                resolve: {
                    extensions: ['.ts', '.js']
                },
            };
        },
    };
};