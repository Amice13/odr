<template>
  <v-card class="mb-4">
    <v-card-text>
      <small v-bind:class="{ 'blue--text': daysDifference > 0, 'red--text': daysDifference < 0 }">{{ daysDifference > 0 ? 'Залишилося' : 'Прострочено' }} днів: {{ Math.abs(daysDifference) }}</small>
      <v-progress-linear :color="daysDifference > 0 ? 'blue' : 'red darken-4'" class="mb-2" style="border-radius: 4px;" height="8" :value="percent" />
      <p class="text-h6 text--primary">{{ cardData.requestOrganization ? cardData.requestOrganization : '' }}</p>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click="commentDialog"
            v-bind="attrs"
            v-on="on"
            color="blue-grey lighten-2"
            x-small
            text>
            <v-icon style="font-size: 18px;">{{ cardData.comment ? 'mdi-chat' : 'mdi-chat-outline' }}</v-icon>
          </v-btn>
        </template>
        <span>Коментар</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            color="blue-grey lighten-2"
            x-small
            text>
            <v-icon left>mdi-clock-outline</v-icon> {{ start }}
          </v-btn>
        </template>
        <span>Створено {{ start }}</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click="datasetDialog"
            v-bind="attrs"
            v-on="on"
            color="blue-grey lighten-2"
            x-small
            text>
            <v-icon left>mdi-database-outline</v-icon> {{ datasetNumber }}
          </v-btn>
        </template>
        <span>Кількість наборів даних: {{ datasetNumber }}</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            color="blue-grey lighten-2"
            :to="editLink + '?edit=' + cardData._id"
            x-small
            text>
            <v-icon style="font-size: 18px;">mdi-pencil-outline</v-icon>
          </v-btn>
        </template>
        <span>Редагувати</span>
      </v-tooltip>

      <v-menu ref="menu" v-model="showMenu" min-width="190" offset-y>
        <template v-slot:activator="{ on: menu }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn v-on="{ ...tooltip, ...menu }" icon color="blue-grey lighten-2" x-small text>
                <v-icon style="font-size: 18px;">mdi-page-next-outline</v-icon>
              </v-btn>
            </template>
            <span>Перемістити</span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item :to="'complaint?edit=' + cardData._id" v-show="this.cardData.status === 'Надіслано запит'">
            <v-list-item-title>Скласти скаргу</v-list-item-title>
          </v-list-item>
          <v-list-item :to="'claim?edit=' + cardData._id" v-show="['Подано скаргу Уповноваженому', 'Надіслано запит'].includes(this.cardData.status)">
            <v-list-item-title>Скласти позов</v-list-item-title>
          </v-list-item>
          <v-list-item @click="deleteDialog">
            <v-list-item-title>Видалити</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-text>

    <v-dialog v-model="dialog" width="500">
      <v-card v-show="dialogType === 'delete'">
        <v-card-title color="blue" dark class="blue white--text text-h5">
          Видалити
        </v-card-title>
        <v-card-text class="text-center">
          <p class="mt-8">Ви впевнені, що хочете видалити цей запис?</p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="dialog = false">Ні</v-btn>
          <v-btn color="primary" text @click="deleteCard(cardData._id)">Так</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-show="dialogType === 'dataset'">
        <v-card-title color="blue" dark class="blue white--text text-h5">
          Набори даних
        </v-card-title>
        <v-card-text class="">
          <p class="mt-8">Цей запит стосуєьться наборів даних:</p>
          <ol class="ml-4">
            <li v-for="(dataset, index) in cardData.dataset" :key="'dataset-' + index">
              {{ dataset.title }}
            </li>
          </ol>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Ок</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-show="dialogType === 'comment'">
        <v-card-title color="blue" dark class="blue white--text text-h5">
          Додати коментар
        </v-card-title>
        <v-card-text class="">
          <p class="mt-8" v-show="!editComment">{{ comment }}</p>
          <v-textarea class="mt-8" v-show="editComment" label="Напишіть ваш коментар"  v-model="comment" rows="4" auto-grow>
            
          </v-textarea>          
          <small v-show="!editComment" @click="editComment = true" class="blue--text" style="cursor: pointer;">(редагувати)</small>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="resetComment">Скасувати</v-btn>
          <v-btn color="primary" text @click="saveComment">Зберегти</v-btn>
        </v-card-actions>
      </v-card>      
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  mounted () {
    console.log(this.cardData)
  },
  props: {
    cardData: {
      type: Object,
      required: false,
      default: () => {
        return {     
        }
      }
    },
  },
  data: () => {
    return {
      comment: '',
      editComment: false,
      showMenu: false,
      dialog: false,
      dialogType: '',
      items: [
        { title: 'hello' },
        { title: 'world' }
      ]
    }
  },
  computed: {
    start () {
      if (this.cardData.status === 'Надіслано запит') {
        return new Date(this.cardData.requestDate).toLocaleString('uk', { year: 'numeric', month: '2-digit', day: '2-digit' })
      }
      if (this.cardData.status === 'Подано скаргу Уповноваженому') {
        return new Date(this.cardData.complaintDate).toLocaleString('uk', { year: 'numeric', month: '2-digit', day: '2-digit' })
      }
      return new Date(this.cardData.claimDate).toLocaleString('uk', { year: 'numeric', month: '2-digit', day: '2-digit' })
    },
    startDate () {
      if (this.cardData.status === 'Надіслано запит') {
        return new Date(this.cardData.requestDate)
      }
      if (this.cardData.status === 'Подано скаргу Уповноваженому') {
        return new Date(this.cardData.complaintDate)
      }
      return new Date(this.cardData.claimDate)
    },
    endDate() {
      if (this.cardData.status === 'Надіслано запит') {
        return new Date(this.cardData.requestAnswerDate)
      }
      if (this.cardData.status === 'Подано скаргу Уповноваженому') {
        return new Date(this.cardData.complaintAnswerDate)
      }
      return new Date(this.cardData.claimAnswerDate)      
    },
    daysDifference () {
      return Math.round((this.endDate - new Date())/(1000*60*60*24))
    },
    percent () {
      return Math.round(100*(new Date() - this.startDate)/(this.endDate - this.startDate))
    },
    commentNumber () {
      return this.cardData.comments ? 'Коментарі ' + this.cardData.comments.length : 'Не додано коментарів'
    },
    datasetNumber () {
      return this.cardData.dataset ? this.cardData.dataset.length : '0'
    },
    editLink () {
      if (this.cardData.status === 'Надіслано запит') {
        return 'request'
      }
      if (this.cardData.status === 'Подано скаргу Уповноваженому') {
        return 'complaint'
      }
      return 'claim'
    }
  },
  methods: {
    deleteDialog: function () {
      this.dialogType = 'delete'
      this.dialog = true
    },
    datasetDialog: function () {
      this.dialogType = 'dataset'
      this.dialog = true
    },
    deleteCard: async function (_id) {
      await this.$db.remove({ _id })
      this.dialog = false
      this.$emit('refresh')
    },
    commentDialog: function () {
      this.dialogType = 'comment'
      this.dialog = true
      if (this.cardData.comment) this.comment = this.cardData.comment
      if (this.comment === '') this.editComment = true
    },
    resetComment: function () {
      this.comment = ''
      this.dialog = false
    },
    saveComment: async function () {
      console.log(this.comment)
      await this.$db.updateAsync({ _id: this.cardData._id, field: 'comment', value: this.comment })
      this.dialog = false
      this.$emit('refresh')
    }
  }
}
</script>
