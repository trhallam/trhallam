export default async function customWebpack(context, opts) {
    return {
        name: 'custom-webpack',
        configureWebpack(config, isServer, utils, content) {
            return {
                experiments: {
                    asyncWebAssembly: true,
                },
            };
        },
    }
}