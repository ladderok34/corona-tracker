module.exports = function(api) {
    api.cache(true);

    const plugins = [
        [
            require.resolve('babel-plugin-module-resolver'),
            {
                alias: {
                    actions: "./src/redux/actions",
                    reducers: "./src/redux/reducers",
                    selectors: "./src/redux/selectors",
                    reduxHooks: "./src/redux/hooks",
                    components: "./src/components",
                    views: "./src/views",
                    api: "./src/api",
                    utils: "./src/utils.js",
                },
            },
        ],
    ];
    const presets = ['babel-preset-expo'];

    return { presets, plugins };
};
