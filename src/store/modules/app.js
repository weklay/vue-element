const state = {
  serviceLoading: false // 接口请求loading
}

const mutations = {
  START_SERVICE(state) {
    state.serviceLoading = true
  },
  END_SERVICE(state) {
    state.serviceLoading = false
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
