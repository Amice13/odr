import Vue from 'vue'
import Vuetify from 'vuetify'
import docxtemplater from 'docxtemplater'
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver'
import { convertToHtml }  from 'mammoth'

const loadFile = url => {
  return new Promise((resolve, reject) => {
    PizZipUtils.getBinaryContent(url, (err, content) => {
      if (err) reject(err)
      else resolve(content)
    })
  })
}

const createDocx = async (file, data = {}, type = 'blob') => {
  const zip = new PizZip(file)
  const doc = new docxtemplater(zip)
  doc.setData(data)
  doc.render()
  const options = { type }
  if (type === 'blob') options.mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  return doc.getZip().generate(options)
}

Vue.prototype.$loadFile = loadFile
Vue.prototype.$createDocx = createDocx
Vue.prototype.$convertToHtml = convertToHtml
Vue.prototype.$saveAs = saveAs
Vue.use(Vuetify)
