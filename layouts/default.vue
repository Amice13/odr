<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app width="240">
      <v-list>
        <v-list-item class="pa-0 header-img">
          <v-list-item-content>
            <v-img contain max-width="120" style="margin: auto;" src="./logo1.png" />
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon class="blue-grey--text text--darken-1">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="blue-grey--text text--darken-1" v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="currentHelp = true">
          <v-list-item-action>
            <v-icon class="blue-grey--text text--darken-1">mdi-help</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="blue-grey--text text--darken-1" v-text="'Про програму'" />
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="blue" dark :clipped-left="clipped" fixed app>
      <v-toolbar-title v-text="title" style="min-width: 230px;" />
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
    </v-app-bar>
    <v-main style="background: #eef5f9;">
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}, Спільнота "OpenUp"</span>
    </v-footer>
    <v-dialog v-model="currentHelp" width="500">
      <v-card>
        <v-card-title color="blue" dark class="blue white--text text-h5">
          Про «Запитувач»
        </v-card-title>
        <v-card-text class="text-justify">
          <p class="mt-8"><strong>«Запитувач»</strong> - це конструктор запитів, скарг для позовів до суду щодо доступу до публічної інформації у формі відкритих даних (далі - відкриті публічні дані).</p>
          <p><a href="https://zakon.rada.gov.ua/laws/show/2939-17#Text" target="_blank">Законом України "Про доступ до публічної інформації"</a> визначено, що громадяни України мають право <strong>запитувати дані</strong> і вимагати оприлюднення відкритих публічних даних.</p>
          <p>Для отримання відкритих публічних даних можна ознайомитись з наборами, які оприлюднені на <a href="https://data.gov.ua" target="_blank">Єдиному державному порталі відкритих даних</a>, на сайті розпорядника або написати <strong>запит</strong> до конкретного розпорядника щодо надання відкритих публічних даних у відповідь. Запит потрібно надіслати на електронну скриньку, вказану для запитів на доступ до публічної інформації на сайті розпорядника або ж на загальну електронну скриньку в розділі «Контакти», якщо спеціальної поштової скриньки для запитів не виділено.</p>
          <p>У випадку, якщо на запит не отримано відповідь, отримано часткову відповідь, відповідь, яка не відповідає формату відкритих даних, можна:</p>
          <ol class="ml-4 mb-6">
            <li>Звернутись зі скаргою до Уповноваженого з прав людини в порядку Закону України «Про звернення громадян»</li>
            <li>Звернутись до адміністративного суду за місцем реєстрації або за місцем реєстрації розпорядника (УТОЧНИТИ!) за захистом прав і оприлюдненням відкритих публічних даних</li>
          </ol>
          <p>Переважно ми <strong>звертаємось</strong> і до Уповноваженого, і до суду. Уповноважений може відкрити провадження за зверненням і подати протокол про порушення ваших прав до суду. На порушників очікує адміністративний штраф.</p>
          <p>Пам'ятайте, що звернення до суду потребує оплати судового збору в розмірі орієнтовно 900-1000 грн за одну позовну вимогу. До судового <strong>позову</strong> обов’язково потрібно додати оригінал квитанції про оплату збору (реквізити містяться на сайтах адміністративних судів, до яких плануєте звертатись), а також копії всіх додатків.</p>
          <p>Позовна заява, копії додатків мають бути у 2 примірника. Всі копії (всі сторінки) завірені наступним написом «Дата, підпис, ініціали, «Згідно з оригіналом». </p>
          <p>Успіхів вам в боротьбі за відкриті дані! Пишіть історії успіху і поразок з хештегом <a href="https://www.facebook.com/hashtag/openuphelper" target="_blank">#openuphelper</a>, щоб ми могли ними теж ділитись.</p>
          <v-checkbox style="text-align: right;" v-model="help" label="Показувати на старті"></v-checkbox>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="currentHelp = false">Ок</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>    
  </v-app>
</template>

<script>
import store from '@/plugins/store-helper'

export default {
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      dialog: false,
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Мої запити',
          to: '/'
        },
        {
          icon: 'mdi-numeric-1-circle',
          title: 'Створити запит',
          to: '/request'
        },
        {
          icon: 'mdi-numeric-2-circle',
          title: 'Подату скаргу',
          to: '/complaint'
        },
        {
          icon: 'mdi-numeric-3-circle',
          title: 'Підготувати позов',
          to: '/claim'
        },
        /*
        {
          icon: 'mdi-table',
          title: 'Статус запитів',
          to: '/status'
        }
        */
      ],
      title: 'Запитувач'
    }
  },
  computed: {
    currentHelp: store('currentHelp'),
    help: store('help')
  }
}
</script>
