const state = {
    userInfo: {}
}

const mutations = {
    SET_USERINFO: (state, userInfo) => {
        state.userInfo = userInfo
    }
}

const actions = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
