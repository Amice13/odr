import Vue from 'vue'
import Vuetify from 'vuetify'
import Nedb from 'nedb'
import util from 'util'

const db = new Nedb({ filename: 'odr', autoload: true })
Vue.prototype.$db = db
Vue.prototype.$db.findAsync = util.promisify(db.find)
Vue.prototype.$db.findOneAsync = util.promisify(db.findOne)
Vue.prototype.$db.insertAsync = util.promisify(db.insert)
Vue.prototype.$db.updateAsync = util.promisify(db.update)
Vue.prototype.$db.removeAsync = util.promisify(db.remove)
Vue.prototype.$db.removeAllAsync = util.promisify((data, cb) => db.remove(data, { multi: true }, (err, res) => cb(err, res)))
Vue.prototype.$db.updateAsync = util.promisify((data, cb) =>
  db.update({ _id: data._id }, { $set: { [data.field]: data.value } }, { multi: false }, (err, res) => cb(err, res)))