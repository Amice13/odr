import Vue from 'vue'
import Vuetify from 'vuetify'

function calculateWorkingDate (n) {
  const currentDate = new Date()
  n = parseInt(n) + 1
  if (Number.isNaN(n)) return currentDate

  const currentYear = currentDate.getFullYear()
  const officialCelebrations = officialDates.map(el => currentYear + '-' + el)

  const expectedDate = new Date()
  while (n !== 0) {
    expectedDate.setDate(expectedDate.getDate() + 1)
    if ([0, 6].includes(expectedDate.getDay())) continue
    if (officialCelebrations.includes(expectedDate.toISOString().substring(0,10))) continue
    n--
  }
  return expectedDate
}

function calculateWorkingDay (n) {
  const currentDate = new Date()
  n = parseInt(n)
  if (Number.isNaN(n)) return currentDate
  currentDate.setDate(currentDate.getDate() + n)
  if (currentDate.getDay() === 0) currentDate.setDate(currentDate.getDate() + 1)
  if (currentDate.getDay() === 6) currentDate.setDate(currentDate.getDate() + 2)
  return currentDate
}

// Official and traditional celebrations
const officialDates = [
  '01-01', '01-07', '01-22', '02-25', '03-10', '05-08', '05-09',
  '06-28', '07-28', '08-24', '09-04', '10-14', '11-09', '11-21',
  '12-25'
]

const getDaysArray = (start, end) => {
  let arr = []
  for(let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt).toISOString().substring(0, 10))
  }
  return arr
}

Vue.prototype.$s = function (field) {
  return {
    get() {
      console.log(field)
      return this.$store.state[field]
    },
    set (value) { this.$store.commit({ type: 'change', field, value }) }
  }
}

Vue.prototype.$calculateWorkingDate = calculateWorkingDate
Vue.prototype.$calculateWorkingDay = calculateWorkingDay
