<template>
  <div>
    <v-row class="page-titles">
      <v-col cols="12" class="mb-0 mt-0 pt-0 pb-0 ml-3 blue-grey--text text--lighten-2">
        <div class="text-themecolor mb-0 mt-0 text-h5 blue--text">Ваші запити на доступ до публічних даних</div>
        <v-breadcrumbs class="custom-breadcrumbs pb-0" :items="breadcrumbs" color="blue">
          <template v-slot:divider>
            <v-icon color="blue-grey lighten-3">mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row class="ml-0 mr-0">
      <v-col cols="12" lg="4">
        <v-card color="blue-grey lighten-5">
          <v-card-subtitle class="font-weight-bold text-h6 d-flex justify-space-between">
            <div>Запити</div>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" text small><v-icon>mdi-dots-horizontal</v-icon></v-btn>
              </template>
              <v-list>
                <v-list-item @click="deleteDialog('Надіслано запит')">
                  <v-list-item-title>Видалити все</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-subtitle>
          <v-card-text>
            <data-card v-for="(card, index) in requests" :card-data="card" :key="'request-' + index" @refresh="refresh" />
            <p class="text-center mt-4" v-show="requests && requests.length === 0">Ви не додали жодного запиту</p>
          </v-card-text>
          <v-card-actions>
            <v-btn text to="/request">Додати запит...</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" lg="4">
        <v-card color="blue-grey lighten-5">
          <v-card-subtitle class="font-weight-bold text-h6 d-flex justify-space-between">
            <div>Скарги</div>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" text small><v-icon>mdi-dots-horizontal</v-icon></v-btn>
              </template>
              <v-list>
                <v-list-item @click="deleteDialog('Подано скаргу Уповноваженому')">
                  <v-list-item-title>Видалити все</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-subtitle>
          <v-card-text>
            <data-card v-for="(card, index) in complaints" :card-data="card" :key="'request-' + index" @refresh="refresh" />
            <p class="text-center mt-4" v-show="complaints && complaints.length === 0">Ви не додали жодної скарги</p>
          </v-card-text>
          <v-card-actions>
            <v-btn text to="complaint">Додати скаргу...</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" lg="4">
        <v-card color="blue-grey lighten-5">
          <v-card-subtitle class="font-weight-bold text-h6 d-flex justify-space-between">
            <div>Позови</div>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" text small><v-icon>mdi-dots-horizontal</v-icon></v-btn>
              </template>
              <v-list>
                <v-list-item @click="deleteDialog('Подано позов до суду')">
                  <v-list-item-title>Видалити все</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-subtitle>
          <v-card-text>
            <data-card v-for="(card, index) in claims" :card-data="card" :key="'request-' + index" @refresh="refresh"/>
            <p class="text-center mt-4" v-show="claims && claims.length === 0">Ви не додали жодного позову</p>
          </v-card-text>
          <v-card-actions>
            <v-btn text to="claim">Додати позов...</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

    </v-row>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title color="blue" dark class="blue white--text text-h5">
          Видалити
        </v-card-title>
        <v-card-text class="text-center">
          <p class="mt-8">Ви впевнені, що хочете видалити всі {{ deleteTargetDescription }}?</p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="dialog = false">Ні</v-btn>
          <v-btn color="primary" text @click="deleteAll">Так</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import store from '@/plugins/store-helper'
import DataCard from '@/components/DataCard'

// self.addEventListener('install', event => console.log('ServiceWorker installed'))

let template

export default {
  components: {
    DataCard
  },
  async mounted () {
    this.refresh()
  },
  data: () => {
    return {
      dialog: false,
      deleteTarget: '',
      data: [],
      breadcrumbs: [
        {
          text: 'Дешборд',
          disabled: true,
          href: '/',
        }
      ]
    }
  },
  computed: {
    name: store('name'),
    requests: function () {
      return this.data.filter(el => el.status === 'Надіслано запит')
    },
    complaints: function () {
      return this.data.filter(el => el.status === 'Подано скаргу Уповноваженому')
    },
    claims: function () {
      return this.data.filter(el => !['Надіслано запит', 'Подано скаргу Уповноваженому'].includes(el.status))
    },
    deleteTargetDescription () {
      if (this.deleteTarget === 'Надіслано запит') return 'запити'
      if (this.deleteTarget === 'Подано скаргу Уповноваженому') return 'скарги'
      return 'позови'
    }
  },
  methods: {
    async refresh () {
      let data = await this.$db.findAsync({})
      this.$set(this, 'data', data)
    },
    deleteDialog (key) {
      this.deleteTarget = key
      this.dialog = true
    },
    async deleteAll () {
      await this.$db.removeAllAsync({ status: this.deleteTarget })
      this.refresh()
      dialog = false
    }
  }
}

</script>
