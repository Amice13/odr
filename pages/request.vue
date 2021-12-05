<template>
  <div>
    <v-row class="page-titles">
      <v-col cols="12" class="mb-0 mt-0 pt-0 pb-0 ml-0 blue-grey--text text--lighten-2">
        <div class="text-themecolor mb-0 mt-0 text-h5 blue--text">{{ editmode ? 'Редагувати' : 'Створити' }} запит на доступ до публічної інформації</div>
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
              Дані запиту
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

                  <div class="subtitle-1 mt-4 ml-8 mb-4 strong">Інформація про набори даних</div>
                  <v-text-field
                    v-model="data.requestOrganization"
                    @keyup.enter="next"
                    @blur="makePreview"
                    prepend-icon="mdi-domain"
                    label="Розпорядник даних"
                    hint="Назва розпорядника даних, до якого подається запит"
                  ></v-text-field>
                  <v-text-field
                    v-model="data.law"
                    @blur="makePreview"
                    @keyup.enter="next"
                    prepend-icon="mdi-book"
                    label="Закон України"
                    hint="Назва закону, за яким розпорядник має публікувати дані"
                  ></v-text-field>
                  <v-fade-transition group>
                    <v-text-field v-for="(item, index) in data.dataset"
                      :key="'data-' + index"
                      @keyup.enter="addDatasetAndSelect"
                      @blur="makePreview"
                      v-model="item.title"
                      :append-icon="data.dataset.length > 1 ? 'mdi-delete' : ''"
                      @click:append="deleteItem(index)"
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
                  <v-btn
                    class="mt-4"
                    color="success"
                    @click="saveDoc"
                    transition="fade-transition"
                    block>
                    <v-icon left>mdi-content-save</v-icon> Зберегти запит
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
          <p class="mt-8">Вам необхідно надіслати цей запит на електронну пошту розпорядника даних. Згідно <strong>частини 1 статті 20</strong> Закону України «Про доступ до публічної інформації» розпорядник інформації має надати відповідь на запит на інформацію <strong>не пізніше п'яти робочих днів з дня отримання запиту</strong>.</p>
          <p>Якщо Ви не надсилаєте запит сьогодні або очікуєте відповідь у іншу дату, змініть значення нижче.</p>
          <v-row justify="space-around">
            <v-menu v-model="dateMenu" :close-on-content-click="false" max-width="290">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :value="new Date(data.requestAnswerDate).toLocaleDateString('uk')"
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
              <v-date-picker v-model="data.requestAnswerDate" @change="dateMenu = false" :first-day-of-week="1" locale="uk-ua" />
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
self.addEventListener('install', event => console.log('ServiceWorker installed'))

let template
const conditionalFields = ['phone', 'law']

export default {
  async mounted () {
    this.currentId = this.$route.query.edit ? this.$route.query.edit : ''
    if (this.currentId) {
      let data = await this.$db.findOneAsync({ _id: this.currentId })
      if (data) {
        this.editmode = true
        this.$set(this, 'data', data)
        this.$set(this, 'oldData', data)
        for (let key of ['name', 'sex', 'email', 'address', 'phone']) {
          this[key] = data[key]
        }
      }
    }
    template = await this.$loadFile('./documents/request-template.docx')
    this.makePreview()
  },
  data: () => {
    return {
      tab: null,
      showDatasetButton: false,
      html: '',
      editmode: false,
      dialog: false,
      dateMenu: false,
      currentId: '',
      currentData: {},
      oldData: {},
      data: {
        // Meta information
        status: '',
        requestDate: new Date(),
        requestDateUk: (new Date()).toLocaleDateString('uk'),
        requestAnswerDate: '',
        extendedRequestAnswerDate: '',

        // Requester info
        sex: 'male',

        // Data controller info
        requestOrganization: '',
        law: '',

        // Dataset info
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
      if (!this.data.requestAnswerDate) return baseurl
      const host = location.href.replace(/\/[^\/]*$/g, '')
      const params = new URLSearchParams()
      params.append('text', 'Запит на інформацію')
      let details = `Вийшов термін отримання відповіді на запит. `
      details += `Перевірте, чи надійшов Вам лист від розпорядника ${this.data.requestOrganization}?`
      details += `<br/><br/>`
      details += `<ul><li><a href="${host}">Перевірити поточний стан запита</a></li>`
      details += `<li><a href="${host}/complaint?edit=${this.currentId}">Підготувати скаргу Уповноваженому</a></li>`
      details += `<li><a href="${host}/claim?edit=${this.currentId}">Підготувати позов</a></li></ul>`
      params.append('details',details)
      params.append('dates', new Date(this.data.requestAnswerDate).toISOString().replace(/[:-]|\.\d+(?=Z)/g, '') + '/undefined')
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
          text: `${ this.editmode ? 'Редагувати' : 'Створити' } запит`,
          disabled: true,
          href: '/request',
        }
      ]
    }
  },
  methods: {
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
    addDatasetAndSelect (event) {
      let that = this
      that.addDataset()
      setTimeout(() => { that.next(event) }, 0)
    },
    prepareData () {
      let data = JSON.parse(JSON.stringify(this.data))
      data.name = this.name
      data.sex = this.sex
      data.email = this.email
      data.address = this.address
      data.phone = this.phone
      data.ifPhone = typeof data.phone === 'string' && data.phone !== ''
      data.ifLaw = typeof data.law === 'string' && data.law !== ''
      data.dataset = data.dataset.filter(el => el.title !== '')
      data.requestDateUk = new Date().toLocaleDateString('uk')

      for (let [key, value] of Object.entries(data)) {
        if (typeof value === 'undefined' || (typeof value === 'string' && value.trim() === '')) data[key] = value ? value : '[НЕ ВИЗНАЧЕНО]'
      }
      return data
    },
    deleteItem (index) {
      this.data.dataset.splice(index, 1)
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
      this.$saveAs(docx, 'Запит від ' + this.currentData.name + ' (' + this.currentData.requestDate + ').docx')
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
      if (this.currentId) {
        await this.$db.update({ _id: this.currentId }, data)
      } else {
        let obj = await this.$db.insertAsync(data)
        this.currentId = obj._id
      }
      this.$set(this, 'currentData', {})
    },
    async saveDoc () {
      this.data.requestAnswerDate = this.$calculateWorkingDate(6).toISOString().substr(0,10)
      this.data.status = 'Надіслано запит'
      this.data.requestDateUk = new Date(this.data.requestDate).toLocaleDateString('uk')
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
    name: function (val) {
      this.sex = val.trim().match(/[оєіїи]вна$|[Кк]изи/g) ? 'female' : 'male'
    }
  }
}

</script>

<style>
.request {
  text-align: justify;
}

.request > table:nth-of-type(1) {
  display: table;
  margin-left: auto;
  text-align: right;
}

.request > table:nth-of-type(1) span:nth-of-type(2) {
  margin-bottom: 1.2rem;
  display: inline-block;
}

.request > table:nth-of-type(2) tr > td:nth-of-type(2) {
  text-align: right;
}

.request > table:nth-of-type(2) {
  margin-top: 2rem;
  width: 100%;
}

.request .title {
  margin: 2rem 0rem;
  text-align: center;
}

.request ol, .request ul {
  margin: 2rem 0rem 2rem 2rem;
}
</style>