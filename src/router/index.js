import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push
// 解决跳转自身问题
Router.prototype.push = function push (location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: []
})
