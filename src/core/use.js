import Vue from 'vue'

// 基础库
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

Vue.use(Antd)

process.env.NODE_ENV !== 'production' && console.warn('[antd-pro] WARNING: Antd now use fulled imported.')
