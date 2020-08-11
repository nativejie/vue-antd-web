const webpack = require('webpack')
const path = require('path')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const GitRevision = new GitRevisionPlugin()
const buildDate = JSON.stringify(new Date().toLocaleString())

const resolve = function (dir) {
    return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
    externals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        axios: 'axios'
    },
    css: [],
    js: [
        '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
        '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
        '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
        '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js'
    ]
}

module.exports = {
    configureWebpack: {
        plugins: [
            // moment 2.18 会将所有本地化内容和核心功能一起打包（见该 GitHub issue）。你可使用 IgnorePlugin 在打包时忽略本地化内容:
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            // 配置全局变量
            new webpack.DefinePlugin({
                APP_VERSION: `"${require('./package.json').version}"`,
                GIT_HASH: JSON.stringify(GitRevision.version()),
                BUILD_DATE: buildDate
            })
        ],
        // 用来告诉 Webpack 要构建的代码中使用了哪些不用被打包的模块，也就是说这些模版是外部环境提供的，Webpack 在打包时可以忽略它们
        externals: isProd ? assetsCDN : {}
    },
    chainWebpack: (config) => {
        config.resolve.alias.set('@$', resolve('src'))

        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule
        .oneOf('inline')
        .resourceQuery(/inline/)
        .use('vue-svg-icon-loader')
        .loader('vue-svg-icon-loader')
        .end()
        .end()
        .oneOf('external')
        .use('file-loader')
        .loader('file-loader')
        .options({
            name: 'assets/[name].[hash:8]:[ext]'
        })
        if (isProd) {
            config.plugin('html').tap(args => {
                console.log(args[0])
                args[0].cdn = assetsCDN
                return args
            })
        }
    },
    css: {
        loaderOptions: {
            sass: {
                modifyVars: {
                    'border-radius-base': '2px'
                },
                javascriptEnabled: true
            }
        }
    },
    devServer: {
        port: 8000
    },
    productionSourceMap: false,
    lintOnSave: undefined,
    transpileDependencies: []
}
