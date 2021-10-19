<template>
  <div>
    <v-row class="page-titles">
      <v-col cols="12" class="mb-0 mt-0 pt-0 pb-0 ml-3 blue-grey--text text--lighten-2">
        <div class="text-themecolor mb-0 mt-0 text-h5 blue--text">{{ editmode ? 'Редагувати' : 'Створити' }} позов до суду</div>
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
                  <div class="subtitle-1 ml-8 mb-4">Інформація про суд</div>
                  <v-select
                    v-model="court"
                    :items="courts.map(el => el.courtTitle)"
                    label="Адміністративний суд"
                    prepend-icon="mdi-gavel"
                  ></v-select>
                  <div class="subtitle-1 mt-4 ml-8 mb-4">Інформація про запитувача даних (позивач)</div>
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
                    v-model="rnokpp"
                    @blur="makePreview"
                    @keyup.enter="next"
                    prepend-icon="mdi-numeric"
                    label="РНОКПП"
                    hint="Реєстраційний номер облікової картки платника податків"
                  ></v-text-field>
                  <v-text-field
                    v-model="address"
                    @blur="makePreview"
                    @keyup.enter="next"
                    prepend-icon="mdi-map-marker"
                    label="Адреса"
                    hint="Адреса для листування"
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

                  <div class="subtitle-1 mt-4 ml-8 mb-4">Інформація про розпорядника даних (відповідач)</div>
                  <v-select
                    v-model="dataOwnerType"
                    :items="dataOwnerTypes.map(el => el.dataOwnerType)"
                    label="Тип розпорядника"
                    prepend-icon="mdi-card-account-details"
                  ></v-select>
                  <v-text-field
                    v-model="data.requestOrganization"
                    @keyup.enter="next"
                    @blur="makePreview"
                    prepend-icon="mdi-domain"
                    label="Розпорядник даних"
                    hint="Назва розпорядника даних, до якого було подано запит"
                  ></v-text-field>
                  <v-text-field
                    v-model="data.edrpou"
                    @blur="makePreview"
                    @keyup.enter="next"
                    prepend-icon="mdi-numeric"
                    label="Код ЄДРПОУ"
                    hint="Код ЄДРПОУ розпорядника даних"
                  ></v-text-field>
                  <v-text-field
                    v-model="data.requestAddress"
                    @blur="makePreview"
                    @keyup.enter="next"
                    prepend-icon="mdi-map-marker"
                    label="Адреса розпорядника"
                    hint="Адреса для листування"
                  ></v-text-field>
                  <v-text-field
                    v-model="data.requestPhone"
                    @blur="makePreview"
                    @keyup.enter="next"
                    prepend-icon="mdi-phone"
                    label="Номер телефону"
                    hint="Номер телефону для зв'язку"
                  ></v-text-field>
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

                  <div class="subtitle-1 mt-4 ml-8 mb-4 strong">Інформація про запит</div>
                  <date-field
                    :value="data.requestDate"
                    @input="update('requestDate', $event)"
                    label="Дата подання запиту"
                  ></date-field>
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
                  <v-text-field  class="mt-4"
                    v-model="data.answerNumber"
                    @keyup.enter="next"
                    @blur="makePreview"
                    prepend-icon="mdi-domain"
                    label="Номер вихідного листа із відповіддю"
                  ></v-text-field>
                  <date-field
                    :value="data.requestAnswerDate"
                    @input="update('requestDate', $event)"
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
                    v-model="data.isFixedInformation"
                    label="Запитувана Інформація є зафіксованою"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="data.isOnlyCourt"
                    label="Інший позов з цих же обставни не подавався"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="data.isEvidence"
                    label="Заходи забезпечення доказів або позову до подання позовної заяви не здійснювались"
                    hide-details
                  ></v-checkbox>
                  <v-textarea
                    v-model="data.courtFee"
                    @blur="makePreview"
                    label="Розмір сплаченого судового збору"
                    prepend-icon="mdi-card-text"
                    auto-grow
                    rows="1"
                  ></v-textarea>

                  <div class="subtitle-1 mt-8 ml-8">Додатки до позову</div>
                  <div class="small ml-8 mb-4"><small>(якщо маєте власні додатки)</small></div>

                  <v-fade-transition group>
                    <v-text-field v-for="(item, index) in data.claimAppendixList"
                      :key="'data-' + index"
                      @keyup.enter="addClaimAppendixAndSelect"
                      @blur="makePreview"
                      v-model="item.title"
                      :append-icon="data.claimAppendixList.length > 1 ? 'mdi-delete' : ''"
                      @click:append="deleteItem(index, 'claimAppendixList')"
                      prepend-icon="mdi-attachment"
                      label="Назва додатку"
                    ></v-text-field>
                  </v-fade-transition>
                  <v-btn
                    class="mt-4"
                    text
                    v-show="showClaimAppendixListButton"
                    @click="addClaimAppendix"
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
                    <v-icon left>mdi-content-save</v-icon> Зберегти позов
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
                  <div v-html="html" class="document-preview claim"></div>
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
          <p class="mt-8">Вам необхідно надіслати цей позов на поштову адресу суду або скористатися <a href="https://id.court.gov.ua/" target="_blank">Електронним судом"</a>. Згідно <strong>статті 193</strong> Кодексу удміністративного судочинства України суд має розпочати розгляд справи по суті <strong>не пізніше ніж через шістдесят днів з дня відкриття провадження у справі</strong>, а у випадку продовження строку підготовчого провадження - не пізніше наступного дня з дня закінчення такого строку.</p>
          <p>Суд розглядає справу по суті <strong>протягом тридцяти днів</strong> з дня початку розгляду справи по суті.</p>
          <p>Якщо Ви не надсилаєте запит сьогодні або очікуєте відповідь у іншу дату, змініть значення нижче.</p>
          <v-row justify="space-around">
            <v-menu v-model="dateMenu" :close-on-content-click="false" max-width="290">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :value="new Date(data.claimAnswerDate).toLocaleDateString('uk')"
                  clearable
                  label="Очікувана дата початку розгляду справи"
                  style="max-width: 220px;"
                  class="mt-4 mb-4"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  @click:clear="date = null"
                ></v-text-field>
              </template>
              <v-date-picker v-model="data.claimAnswerDate" @change="dateMenu = false" :first-day-of-week="1" locale="uk-ua" />
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
import courts from '@/registers/courts'
import dataOwnerTypes from '@/registers/dataOwnerTypes'

let template

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
        this.$set(this, 'data', Object.assign(JSON.parse(JSON.stringify(this.data)), data))
        this.$set(this, 'oldData', Object.assign(JSON.parse(JSON.stringify(this.data)), data))
        for (let key of ['name', 'sex', 'email', 'address', 'phone']) {
          this[key] = data[key]
        }
      }
    }
    template = await this.$loadFile('./documents/claim-template.docx')
    this.makePreview()
  },
  data: () => {
    return {
      tab: null,
      showDatasetButton: false,
      showPublicInterestButton: false,
      showClaimAppendixListButton: false,
      html: '',
      editmode: false,
      dialog: false,
      dateMenu: false,
      complaintTypes: ['Відмова у наданні даних', 'Відсутня відповідь розпорядника'],
      currentId: '',
      currentData: {},
      oldData: {},
      court: '',
      dataOwnerType: '',
      data: {
        // Meta information
        status: '',
        requestDate: new Date(),
        requestAnswerDate: '',
        extendedRequestAnswerDate: '',

        // Requester info
        sex: 'male',
        rnokpp: '',

        // Data controller info
        requestOrganization: '',
        edrpou: '',
        requestAddress: '',
        requestPhone: '',
        dataOwnerEmail: '',
        dataOwnerItem: '',
        dataOwnerParagraph: '',
        dataOwnerArticle: '',
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
        answerNumber: '',
        answerDate: new Date(),
        answerContent: '',
        hasPublicInterest: false,
        publicInterest: [
          { title: '' }
        ],
        claimAppendixList: [
          { title: '' }
        ],

        // Claim info
        courtTitle: '',
        courtTitleInGenetive: '',
        courtAddress: '',
        courtEmail: '',
        claimDate: '',
        isFixedInformation: false,
        openArguments: '',
        isOnlyCourt: false,
        isEvidence: false,
        courtFee: '',
        claimDate: new Date(),
        claimAnswerDate: new Date(),

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
    rnokpp: store('rnokpp'),
    address: store('address'),
    email: store('email'),
    phone: store('phone'),
    courts () { return courts },
    dataOwnerTypes () { return dataOwnerTypes },
    googleCalendar () {
      const baseurl = `https://www.google.com/calendar/render?action=TEMPLATE&`
      if (!this.data.claimAnswerDate) return baseurl
      const host = location.href.replace(/\/[^\/]*$/g, '')
      const params = new URLSearchParams()
      params.append('text', 'Позов щодо надання відкритих даних')
      let details = `Вийшов термін початку розгляду справи щодо відкриття даних.`
      details += `Перевірте, чи надійшов Вам лист від від суду щодо відкритих даних Розпорядника ${this.data.requestOrganization}?`
      details += `<br/><br/>`
      details += `<ul><li><a href="${host}">Перевірити поточний стан позову</a></li>`
      details += `<li><a href="https://court.gov.ua/assignments/">Перейти до списку судових справ, призначених для розгляду</a></li></ul>`
      params.append('details',details)
      params.append('dates', (new Date(this.data.claimAnswerDate)).toISOString().replace(/[:-]|\.\d+(?=Z)/g, '') + '/undefined')
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
          text: `${ this.editmode ? 'Редагувати' : 'Створити' } позов`,
          disabled: true,
          href: '/claim',
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
    addClaimAppendix () {
      this.data.claimAppendixList.push({ title: '' })
    },
    addClaimAppendixAndSelect (event) {
      if (!event.target.value) return false
      let that = this
      that.addClaimAppendix()
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
      data.rnokpp = this.rnokpp
      data.phone = this.phone
      data.ifPhone = typeof data.phone === 'string' && data.phone !== ''
      data.ifLaw = typeof data.law === 'string' && data.law !== ''
      data.dataset = data.dataset.filter(el => el.title !== '')
      data.requestDateUk = new Date(data.requestDate).toLocaleDateString('uk')
      data.requestDataLiteral = makeLiteral(data.requestDateUk)
      data.answerDateLiteral = makeLiteral((new Date(data.answerDate)).toLocaleDateString('uk'))
      data.complaintDateUk = new Date(data.complaintDate).toLocaleDateString('uk')
      data.claimDateUk = new Date(data.claimDate).toLocaleDateString('uk')
      data.isRejected = data.complaintType === 'Відмова у наданні даних'
      data.isNoAnswer = data.complaintType === 'Відсутня відповідь розпорядника'
      data.courtTitleInGenetive = data.courtTitle.replace(/ий /g, 'ого ').replace(/суд$/ig, 'суду')
      
      for (let [key, value] of Object.entries(data)) {
        if (['complaintCircumstances', 'answerContent', 'openArguments', 'courtEmail', 'phone', 'equestPhone'].includes(key)) continue
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
      this.$saveAs(docx, 'Позов від ' + this.currentData.name + ' (' + this.currentData.claimDateUk + ').docx')
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
      this.data.status = 'Подано позов до суду'
      this.data.claimAnswerDate = new Date(today.setDate(today.getDate() + 60)).toISOString().substr(0,10)
      this.data.claimDateUk = new Date(this.data.claimDate).toLocaleDateString('uk')
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
    'data.claimAppendixList': {
      deep: true,
      handler: function (arr) {
        this.showClaimAppendixListButton = arr[arr.length - 1].title !== ''
      }
    },
    court: function (value) {
      let court = this.courts.find(el => el.courtTitle === value)
      this.data.courtTitle = court.courtTitle
      this.data.courtAddress = court.courtAddress
      this.data.courtEmail = court.courtEmail
      this.makePreview()
    },
    dataOwnerType: function (value) {
      let dataOwner = this.dataOwnerTypes.find(el => el.dataOwnerType === value)
      this.data.dataOwnerType = dataOwner.dataOwnerType
      this.data.dataOwnerArticle = dataOwner.dataOwnerArticle
      this.data.dataOwnerParagraph = dataOwner.dataOwnerParagraph
      this.data.dataOwnerItem = dataOwner.dataOwnerItem
      this.makePreview()
    },
    'data.complaintType': function (value) { this.makePreview() },
    'data.isSentByEmail': function (value) { this.makePreview() },
    'data.isExtended': function (value) { this.makePreview() },
    'data.isNotSentToCourt': function (value) { this.makePreview() },
    'data.isFixedInformation': function (value) { this.makePreview() },
    'data.isOnlyCourt': function (value) { this.makePreview() },
    'data.isEvidence': function (value) { this.makePreview() },
    'data.isNotSentToCourt': function (value) { this.makePreview() },
    name: function (val) {
      if (!val) return false
      this.sex = val.trim().match(/[оєіїи]вна$|[Кк]изи/g) ? 'female' : 'male'
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

<style>
.page-titles {
  padding-bottom: 20px;
}

.page-titles {
  background: #fff;
  margin: -15px -30px 0px;
  padding: 15px;
  box-shadow: 1px 0 5px rgb(0 0 0 / 10%);
}

.custom-breadcrumbs {
  margin: -15px 0px 0px -22px !important;
}

.v-breadcrumbs__divider {
  padding: 0px 5px !important;
}

.pseudoheader {
  border-bottom: 1px solid #dee2e6;
  font-weight: 300;
}

.pseudoheader .v-tabs-slider-wrapper {
  height: 1px;
}

.pseudoheader .v-tab--active {
  background-color: #eef5f9;
  border-color: #dee2e6 #dee2e6 #eef5f9;
}

.strong {
  font-weight: bold;
}

.w-100 {
  width: 100%;
}

.placeholder {
  background: #FFF59D;
  padding: 2px 5px;
  border-radius: 2px;
}

.claim {
  text-align: justify;
}

.claim > table:nth-of-type(1) {
  display: table;
  margin-left: auto;
  text-align: left;
}

.claim > table:nth-of-type(1) td:nth-of-type(1) {
  vertical-align: baseline;
  padding-right: 2em;
  font-weight: bold;
}

.claim > table:nth-of-type(1) span:nth-of-type(2) {
  margin-bottom: 1.2rem;
  display: inline-block;
}

.claim > table:nth-of-type(2) tr > td:nth-of-type(2) {
  text-align: right;
}

.claim > table:nth-of-type(2) {
  margin-top: 2rem;
  width: 100%;
}

.claim .title {
  margin: 2rem 0rem;
  text-align: center;
}

.claim ol, .claim ul {
  margin: 2rem 0rem 2rem 2rem;
}

</style>