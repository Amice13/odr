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
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
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
  }
}
</script>
