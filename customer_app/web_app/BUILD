filegroup(
    name = "source_files",
    srcs = [
        ".babelrc",
        "package.json",
        "src/",
        "tsconfig.json",
        "webpack.config.js",
    ],
)

genrule(
    name = "distribution",
    srcs = [
        ":source_files",
    ],
)
