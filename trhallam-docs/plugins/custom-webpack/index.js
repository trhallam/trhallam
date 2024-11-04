export default async function customWebpack(context, opts) {
    return {
        name: 'custom-webpack',
        configureWebpack(config, isServer, utils, content) {
            return {
                output: {
                    webassemblyModuleFilename: "[hash].wasm",
                },
                module: {
                    rules: [
                        {
                            test: /\.wasm$/,
                            type: "webassembly/async"
                        }
                    ]
                },
                experiments: {
                    asyncWebAssembly: true,
                },
            };
        },
    }
}