export const state = () => ({
  name: '',
  sex: '',
  email: '',
  phone: '',
  address: '',
  rnokpp: '',
  cache: {}
})

export const getters = {
  getField: state => field => {
    if (state[field] && state[field] !== '') return state[field]
    if (state.cache[field] && state.cache[field] !== '') return state.cache[field]
    return ''
  }
}

export const mutations = {
  change (state, payload) {
    if (typeof payload === 'Object') {
      this.$set(this, state, payload.value)
    }
    state[payload.field] = payload.value
  },
  setCache (state, payload) {
    Object.assign(state.cache, { [payload.name]: payload.value })
  }
}

export const actions = {
  setCache(context, payload) {
    context.commit('setCache', payload)
  }
}
