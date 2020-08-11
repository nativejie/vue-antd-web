const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

const plugins = []
if (IS_PROD) {
  // 生产环境去除console
  plugins.push('transform-remove-console')
}

plugins.push(['import'], {
  'libraryName': 'ant-design-vue',
  'librartDirectory': 'es',
  'style': true
})
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
