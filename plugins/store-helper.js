module.exports = function (field) {
  return {
    get() { return this.$store.state[field] },
    set (value) { this.$store.commit({ type: 'change', field, value }) }
  }
}