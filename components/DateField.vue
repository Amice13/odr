<template>
  <div>
    <v-menu
      v-model="dateMenu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :value="shownValue"
          :label="label"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        locale="uk-ua"
        :value="currentValue"
        @input="update($event)"
        :label="label"
        :first-day-of-week="1"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      required: false,
      default: () => {
        return {
          label: ''
        }
      }
    },
    label: {
      type: String,
      required: false
    },
    value: {
      required: false,
        default: () => {
        return {}
      }
    }
  },
  data: () => {
    return {
      dateMenu: false,
      realValue: '2021-12-12'
    }
  },
  computed: {
    currentValue () {
      if (!this.value) return new Date().toISOString().substr(0, 10)
      let value = this.value.getMonth === 'function' ? this.value.toISOString() : this.value
      return new Date(value).toISOString().substr(0, 10)
    },
    shownValue () {
      if (!this.value) return new Date().toLocaleString('uk').substr(0, 10)
      let value = this.value.getMonth === 'function' ? this.value.toISOString() : this.value
      return new Date(this.value).toLocaleString('uk').substr(0, 10)
    }
  },
  methods: {
    update (value) {
      this.$emit('input', value)
      this.dateMenu = false
    }
  }
}
</script>
