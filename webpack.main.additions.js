module.exports = {
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
