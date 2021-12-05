<template>
  <div>
    <v-row class="page-titles">
      <v-col cols="12" class="mb-0 mt-0 pt-0 pb-0 ml-0 blue-grey--text text--lighten-2">
        <div class="text-themecolor mb-0 mt-0 text-h5 blue--text">{{ editmode ? 'Редагувати' : 'Створити' }} скаргу до Уповноваженого Верховної Ради з прав людини</div>
        <v-breadcrumbs class="custom-breadcrumbs pb-0" :items="breadcrumbs" color="blue">
          <template v-slot:divider>
            <v-icon color="blue-grey lighten-3">mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row class="ml-0 mr-0">
      <v-col cols="12" lg="4">
        <v-card>
          <v-tabs class="pseudoheader" v-model="tab">
            <v-tabs-slider></v-tabs-slider>
            <v-tab href="#tab-1">
              Дані скарги
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab" id="input">
            <v-tab-item key="1" value="tab-1">
              <v-card flat>
                <v-card-text class="pt-6 pb-6 pr-6">
                  <div class="subtitle-1 ml-8 mb-4">Інформація про запитувача даних</div>
                  <v-text-field
                    v-model="name"
                    @blur="makePreview"
                    @keyup.enter="next"
                    @click:prepend="toggleSex"
                    :prepend-icon="sex === 'male' ? 'mdi-face-man' : 'mdi-face-woman'"
                    label="Прізвище, ім'я та по батькові"
                    hint="Дані подавача запиту"
                  ></v-text-field>
                  <v-text-field
                    v-model="email"
                    @blur="makePreview"
                    @keyup.enter="next"
                    prepend-icon="mdi-email"
                    label="Електронна адреса"
                    hint="Ваша електронна адреса для відповіді"
                  ></v-text-field>
                  <v-text-field
                    v-model="phone"
                    @blur="makePreview"
                    @keyup.enter="next"
                    prepend-icon="mdi-phone"
                    label="Номер телефону"
                    hint="Ваш номер телефону"
                  ></v-text-field>

                  <div class="subtitle-1 mt-4 ml-8 mb-4 strong">Інформація про запит</div>
                  <date-field
                    :value="data.requestDate"
                    @input="update('requestDate', $event)"
                    label="Дата подання запиту"
                  ></date-field>
                  <v-text-field
                    v-model="data.requestOrganization"
                    @keyup.enter="next"
                    @blur="makePreview"
                    prepend-icon="mdi-domain"
                    label="Розпорядник даних"
                    hint="Назва розпорядника даних, до якого було подано запит"
                  ></v-text-field>
                  <v-fade-transition group>
                    <v-text-field v-for="(item, index) in data.dataset"
                      :key="'data-' + index"
                      @keyup.enter="addDatasetAndSelect"
                      @blur="makePreview"
                      v-model="item.title"
                      :append-icon="data.dataset.length > 1 ? 'mdi-delete' : ''"
                      @click:append="deleteItem(index, 'dataset')"
                      prepend-icon="mdi-database"
                      label="Набір даних"
                      hint="Назва набору даних"
                    ></v-text-field>
                  </v-fade-transition>
                  <v-btn
                    class="mt-4"
                    text
                    v-show="showDatasetButton"
                    @click="addDataset"
                    transition="fade-transition"
                    block>
                    <v-icon left>mdi-plus</v-icon> Додати набір
                  </v-btn>

                  <div class="subtitle-1 mt-4 ml-8 mb-4 strong">Інформація про скаргу</div>
                  <v-select
                    v-model="data.complaintType"
                    prepend-icon="mdi-book-open-page-variant"
                    :items="complaintTypes"
                    label="Тип скарги"
                  ></v-select>
                  <div v-show="data.complaintType === 'Відмова у наданні даних'">
                    <v-text-field
                      v-model="data.answerNumber"
                      @keyup.enter="next"
                      @blur="makePreview"
                      prepend-icon="mdi-domain"
                      label="Номер вихідного листа із відповіддю"
                    ></v-text-field>
                    <date-field
                      :value="data.requestAnswerDate"
                      @input="update('requestAnswerDate', $event)"
                      label="Дата відповіді розпорядника"
                    ></date-field>
                    <v-textarea
                      v-model="data.answerContent"
                      @blur="makePreview"
                      label="Зміст відповіді розпорядника"
                      prepend-icon="mdi-file-document-edit"
                      auto-grow
                      rows="1"
                    ></v-textarea>
                  </div>
                  <v-textarea
                    v-model="data.complaintCircumstances"
                    @blur="makePreview"
                    label="Інші обставини справи"
                    prepend-icon="mdi-card-text"
                    auto-grow
                    rows="1"
                  ></v-textarea>
                  <v-checkbox
                    v-model="data.hasPublicInterest"
                    label="Запитувані дані мають суспільний інтерес"
                    hide-details
                  ></v-checkbox>
                  <div v-show="data.hasPublicInterest">
                    <v-fade-transition group>
                      <v-text-field v-for="(item, index) in data.publicInterest"
                        :key="'data-' + index"
                        @keyup.enter="addPublicInterestAndSelect"
                        @blur="makePreview"
                        v-model="item.title"
                        :append-icon="data.publicInterest.length > 1 ? 'mdi-delete' : ''"
                        @click:append="deleteItem(index, 'publicInterest')"
                        prepend-icon="mdi-circle-small"
                        label="Аргумент щодо сусупільного інтересу"
                        hint="Поясність власну позицію щодо нявності суспільного інтересу"
                      ></v-text-field>
                    </v-fade-transition>
                    <v-btn
                      class="mt-4"
                      text
                      v-show="showPublicInterestButton"
                      @click="addPublicInterest"
                      transition="fade-transition"
                      block>
                      <v-icon left>mdi-plus</v-icon> Додати аргумент
                    </v-btn>
                  </div>
                  <v-checkbox
                    v-model="data.isSentByEmail"
                    label="Запит надіслано електронною поштою"
                    hide-details
                  ></v-checkbox>
                  <v-text-field v-show="data.isSentByEmail"
                    v-model="data.dataOwnerEmail"
                    @keyup.enter="next"
                    @blur="makePreview"
                    prepend-icon="mdi-at"
                    label="Електронна пошта розпорядника даних"
                    hint="Електронна адреса, на яку ви надсилали запит"
                  ></v-text-field>
                  <v-checkbox
                    v-show="data.complaintType === 'Відсутня відповідь розпорядника'"
                    v-model="data.isExtended"
                    label="Розпорядник не просив продовжити строк розгляду запиту"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="data.isNotSentToCourt"
                    label="Щодо зазначених обставин не було направлено позов до суду"
                    hide-details
                  ></v-checkbox>

                  <div class="subtitle-1 mt-8 ml-8">Додатки до скарги</div>
                  <div class="small ml-8 mb-4"><small>(якщо маєте власні додатки)</small></div>

                  <v-fade-transition group>
                    <v-text-field v-for="(item, index) in data.appendixList"
                      :key="'data-' + index"
                      @keyup.enter="addAppendixAndSelect"
                      @blur="makePreview"
                      v-model="item.title"
                      :append-icon="data.appendixList.length > 1 ? 'mdi-delete' : ''"
                      @click:append="deleteItem(index, 'appendixList')"
                      prepend-icon="mdi-attachment"
                      label="Назва додатку"
                    ></v-text-field>
                  </v-fade-transition>
                  <v-btn
                    class="mt-4"
                    text
                    v-show="showAppendixListButton"
                    @click="addAppendix"
                    transition="fade-transition"
                    block>
                    <v-icon left>mdi-plus</v-icon> Ще один додаток
                  </v-btn>

                  <v-btn
                    class="mt-4"
                    color="success"
                    @click="saveDoc"
                    transition="fade-transition"
                    block>
                    <v-icon left>mdi-content-save</v-icon> Зберегти скаргу
                  </v-btn>

                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>

      <v-col cols="12" lg="8">
        <v-card>
          <v-tabs class="pseudoheader" v-model="tab">
            <v-tabs-slider></v-tabs-slider>
            <v-tab href="#tab-1">
              Попередній перегляд
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item key="1" value="tab-1">
              <v-card flat ref="preview">
                <v-card-text>
                  <div v-html="html" class="document-preview request"></div>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title color="blue" dark class="blue white--text text-h5">
          Надсилання запиту
        </v-card-title>
        <v-card-text class="text-center">
          <p class="mt-8">Вам необхідно надіслати цю скаргу на електронну пошту Уповноваженого Верховної Ради України з прав людини. Згідно <strong>статті 20</strong> Закону України «Про звернення громадян» звернення розглядаються і вирішуються у термін <strong>не більше одного місяця від дня їх надходження</strong>. Якщо в місячний термін вирішити порушені у зверненні питання неможливо, керівник відповідного органу, підприємства, установи, організації або його заступник встановлюють необхідний термін для його розгляду, про що повідомляється особі, яка подала звернення. При цьому загальний термін вирішення питань, порушених у зверненні, <strong>не може перевищувати сорока п'яти днів</strong>.</p>
          <p>Якщо Ви не надсилаєте скаргу сьогодні або очікуєте відповідь у іншу дату, змініть значення нижче.</p>
          <v-row justify="space-around">
            <v-menu v-model="dateMenu" :close-on-content-click="false" max-width="290">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :value="new Date(data.complaintAnswerDate).toLocaleDateString('uk')"
                  clearable
                  label="Очікувана дата відповіді"
                  style="max-width: 220px;"
                  class="mt-4 mb-4"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  @click:clear="date = null"
                ></v-text-field>
              </template>
              <v-date-picker v-model="data.complaintAnswerDate" @change="dateMenu = false" :first-day-of-week="1" locale="uk-ua" />
            </v-menu>
          </v-row>
          <v-btn color="red darken-2" text :href="googleCalendar" target="_blank"><v-icon left>mdi-calendar</v-icon> Додати в Google Calendar</v-btn>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="dialog = false">Скасувати</v-btn>
          <v-btn color="primary" text @click="downloadDoc">Зберегти та надіслати</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import store from '@/plugins/store-helper'
import DateField from '@/components/DateField'

let template
const conditionalFields = ['phone', 'law']

export default {
  components: {
    DateField
  },
  async mounted () {
    this.currentId = this.$route.query.edit ? this.$route.query.edit : ''
    if (this.currentId) {
      let data = await this.$db.findOneAsync({ _id: this.currentId })
      if (data) {
        this.editmode = true
        for (let key of Object.keys(data)) {
          if (data[key] === '[НЕ ВИЗНАЧЕНО]') delete data[key]
        }
        console.log(data)
        this.$set(this, 'data', Object.assign(JSON.parse(JSON.stringify(this.data)), data))
        this.$set(this, 'oldData', Object.assign(JSON.parse(JSON.stringify(this.data)), data))
        for (let key of ['name', 'sex', 'email', 'address', 'phone']) {
          this[key] = data[key]
        }
      }
    }
    template = await this.$loadFile('./documents/complaint-template.docx')
    this.makePreview()
  },
  data: () => {
    return {
      tab: null,
      showDatasetButton: false,
      showPublicInterestButton: false,
      showAppendixListButton: false,
      html: '',
      editmode: false,
      dialog: false,
      dateMenu: false,
      complaintTypes: ['Відмова у наданні даних', 'Відсутня відповідь розпорядника'],
      currentId: '',
      currentData: {},
      oldData: {},
      data: {
        // Meta information
        status: '',
        requestDate: new Date(),
        requestAnswerDate: '',
        extendedRequestAnswerDate: '',

        // Requester info
        sex: 'male',

        // Data controller info
        requestOrganization: '',
        law: '',

        // Ombudsman
        complaintDate: new Date(),
        complaintAnswerDate: '',
        complaintDateUk: '',
        requestDataLiteral: '',
        complaintCircumstances: '',
        isNotSentToCourt: false,
        isExtended: false,
        isSentByEmail: false,
        complaintType: '',
        dataOwnerEmail: '',
        answerNumber: '',
        answerDate: new Date(),
        answerContent: '',
        hasPublicInterest: false,
        publicInterest: [
          { title: '' }
        ],
        appendixList: [
          { title: '' }
        ],

        // Date info
        dataset: [
          { title: '' }
        ]
      }
    }
  },
  computed: {
    name: store('name'),
    sex: store('sex'),
    address: store('address'),
    email: store('email'),
    phone: store('phone'),
    googleCalendar () {
      const baseurl = `https://www.google.com/calendar/render?action=TEMPLATE&`
      if (!this.data.complaintAnswerDate) return baseurl
      const host = location.href.replace(/\/[^\/]*$/g, '')
      const params = new URLSearchParams()
      params.append('text', 'Скарга до Уповноваженого ВР')
      let details = `Вийшов термін отримання відповіді на скаргу до Уповноваженого Верховної Ради з прав людини `
      details += `Перевірте, чи надійшов Вам лист від розпорядника Упоноваженого Верховної Ради з прав людини щодо скарги на дії чи бездіяльність щодо відкриття даних Розпорядником ${this.data.requestOrganization}?`
      details += `<br/><br/>`
      details += `<ul><li><a href="${host}">Перевірити поточний стан скарги</a></li>`
      details += `<li><a href="${host}/claim?edit=${this.currentId}">Підготувати позов</a></li></ul>`
      params.append('details',details)
      params.append('dates', (new Date(this.data.complaintAnswerDate)).toISOString().replace(/[:-]|\.\d+(?=Z)/g, '') + '/undefined')
      return baseurl + params
    },
    breadcrumbs() {
      return [
       {
          text: 'Мої запити',
          disabled: false,
          href: '/',
        },
        {
          text: `${ this.editmode ? 'Редагувати' : 'Створити' } скаргу`,
          disabled: true,
          href: '/request',
        }
      ]
    }
  },
  methods: {
    update (key, value) {
      this.data[key] = value
      this.makePreview()
    },
    toggleSex () {
      this.sex = this.sex === 'male' ? 'female' : 'male'
    },
    next (event) {
      let inputs = document.querySelectorAll('#input input')
      let target = event.target
      let current = Array.from(inputs).indexOf(target)
      if (current === -1 ) return false
      inputs[current + 1].focus()
    },
    addDataset () {
      this.data.dataset.push({ title: '' })
    },
    addPublicInterest () {
      this.data.publicInterest.push({ title: '' })
    },
    addAppendix () {
      this.data.appendixList.push({ title: '' })
    },
    addAppendixAndSelect (event) {
      if (!event.target.value) return false
      let that = this
      that.addAppendix()
      setTimeout(() => { that.next(event) }, 0)
    },
    addDatasetAndSelect (event) {
      if (!event.target.value) return false
      let that = this
      that.addDataset()
      setTimeout(() => { that.next(event) }, 0)
    },
    addPublicInterestAndSelect (event) {
      if (!event.target.value) return false
      let that = this
      that.addPublicInterest()
      setTimeout(() => { that.next(event) }, 0)
    },
    prepareData () {
      let data = JSON.parse(JSON.stringify(this.data))
      data.name = this.name
      data.sex = this.sex
      data.isMale = this.sex === 'male'
      data.email = this.email
      data.address = this.address
      data.phone = this.phone
      data.ifPhone = typeof data.phone === 'string' && data.phone !== ''
      data.ifLaw = typeof data.law === 'string' && data.law !== ''
      data.dataset = data.dataset.filter(el => el.title !== '')
      data.requestDateUk = new Date(data.requestDate).toLocaleDateString('uk')
      data.requestDataLiteral = makeLiteral(data.requestDateUk)
      data.answerDateLiteral = makeLiteral((new Date(data.answerDate)).toLocaleDateString('uk'))
      data.complaintDateUk = new Date(data.complaintDate).toLocaleDateString('uk')
      data.isRejected = data.complaintType === 'Відмова у наданні даних'
      data.isNoAnswer = data.complaintType === 'Відсутня відповідь розпорядника'

      for (let [key, value] of Object.entries(data)) {
        if (['complaintCircumstances', 'answerContent'].includes(key)) continue
        if (typeof value === 'undefined' || (typeof value === 'string' && value.trim() === '')) data[key] = value ? value : '[НЕ ВИЗНАЧЕНО]'
      }
      return data
    },
    deleteItem (index, type) {
      this.data[type].splice(index, 1)
      this.makePreview()
    },
    async makePreview () {
      const data = this.prepareData()
      const docx = await this.$createDocx(template, data, 'arraybuffer')
      const html = await this.$convertToHtml({ arrayBuffer: docx }, {
        styleMap: [
          'p.custom => span.placeholder',
          'p[style-name=\'custom Char\'] => span.placeholder',
          'p[style-name=\'custom\'] => span.placeholder',
          'r[style-name=\'custom Char\'] => span.placeholder',
          'r[style-name=\'custom\'] => span.placeholder',
          'r[style-name=\'Title\'] => p.title',
          'p[style-name=\'Title\'] => p.title',
        ]
      })
      this.html = html.value
    },
    async downloadDoc () {
      const docx = await this.$createDocx(template, this.currentData)
      this.dialog = false
      this.$saveAs(docx, 'Скарга від ' + this.currentData.name + ' (' + this.currentData.complaintDateUk + ').docx')
      if (this.currentId) {
        await this.$db.update({ _id: this.currentId }, this.data)
      } else {
        let obj = await this.$db.insertAsync(this.data)
        this.currentId = obj._id
      }
    },
    async removeDoc () {
      if (!editmode) {
        await this.$db.remove({ _id: this.currentId })
        this.currentId = ''
      } else {
        await this.$db.update({ _id: this.currentId }, this.oldData)        
      }
      this.$set(this, 'currentData', {})
    },
    async saveDoc () {
      let today = new Date()
      this.data.complaintAnswerDate = new Date(today.setMonth(today.getMonth() + 1)).toISOString().substr(0,10)
      this.data.status = 'Подано скаргу Уповноваженому'
      this.data.complaintDateUk = new Date(this.data.complaintDate).toLocaleDateString('uk')
      this.dialog = true

      // Prepare data for the document
      const data = this.prepareData()

      // Save current doc to the database
      if (this.currentId) {
        await this.$db.update({ _id: this.currentId }, data)
      } else {
        let obj = await this.$db.insertAsync(data)
        this.currentId = obj._id
      }
      this.$set(this, 'currentData', data)
    }
  },
  watch: {
    'data.dataset': {
      deep: true,
      handler: function (arr) {
        this.showDatasetButton = arr[arr.length - 1].title !== ''
      }
    },
    'data.publicInterest': {
      deep: true,
      handler: function (arr) {
        this.showPublicInterestButton = arr[arr.length - 1].title !== ''
      }
    },
    'data.appendixList': {
      deep: true,
      handler: function (arr) {
        this.showAppendixListButton = arr[arr.length - 1].title !== ''
      }
    },
    'data.complaintType': function (value) { this.makePreview() },
    'data.isSentByEmail': function (value) { this.makePreview() },
    'data.isExtended': function (value) { this.makePreview() },
    'data.isNotSentToCourt': function (value) { this.makePreview() },
    name: function (val) {
      this.sex = val.trim().match(/[єіїи]вна$|[Кк]изи/g) ? 'female' : 'male'
    },
    sex: function (val) {
      this.makePreview()
    }
  }
}

const months = [
  'січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
  'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'
]

const makeLiteral = date => {
  return date.replace(/\.\d{2}\./, str => {
    let month = str.match(/\d+/)[0]
    month = months[parseInt(month - 1)]
    return ` ${month} `
  })
}

</script>