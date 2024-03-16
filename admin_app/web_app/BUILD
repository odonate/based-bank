genrule(
    name = "distribution",
    srcs = [
        ":source_files",
        "package.json",
        "tsconfig.json",
        "webpack.config.js",
        ".babelrc",
    ],
    outs = ["distribution/"],
    building_description = "frontend",
    cmd = "yarn --cwd $PKG_DIR build && mv $PKG_DIR/distribution .",
    output_is_complete = True,
    deps = [":node_modules"],
)

sh_cmd(
    name = "serve_hot_reload",
    srcs = [
        ".babelrc",
        "package.json",
        "tsconfig.json",
        "webpack.config.js",
        ":source_files",
    ],
    cmd = "yarn --cwd plz-out/gen/admin_app/web_app test --open",
    deps = [
        ":node_modules",
    ],
)

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
    name = "node_modules",
    srcs = ["package.json"],
    outs = [
        "node_modules",
    ],
    building_description = "fetching node modules",
    cmd = "yarn --cwd $PKG_DIR install && mv $PKG_DIR/node_modules .",
    output_is_complete = True,
    sandbox = False,
)
