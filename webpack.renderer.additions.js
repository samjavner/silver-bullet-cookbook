const StyleLintPlugin = require("stylelint-webpack-plugin");

module.exports = {
    plugins: [
        new StyleLintPlugin({
            emitErrors: false,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "tslint-loader",
                enforce: "pre",
                exclude: /node_modules/,
            },
        ],
    },
};
