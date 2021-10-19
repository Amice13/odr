import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    key: 'odr',
    storage: localStorage
  }).plugin(store)
}
