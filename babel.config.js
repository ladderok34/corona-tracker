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
                    api: "./src/api",
                },
            },
        ],
    ];
    const presets = ['babel-preset-expo'];

    return { presets, plugins };
};
