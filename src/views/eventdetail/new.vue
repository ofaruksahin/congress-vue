<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12 md6 class="ma-5">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark>
            <v-btn icon @click="goBack">
              <v-icon>fa fa-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title>Yeni Konuşmacı Ekle</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="formValid">
              <v-row class="ma-5">
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="eventdetail.speakerName"
                    :counter="50"
                    :rules="nameRule"
                    label="Konuşmacı Adı"
                    outlined
                    required
                  ></v-text-field>
                  <v-textarea
                    v-model="eventdetail.description"
                    :rules="descriptionRule"
                    label="Açıklama"
                    counter
                    required
                    outlined
                  ></v-textarea>
                  <v-text-field
                    v-model="eventdetail.day"
                    label="Konuşmacı Günü"
                    :min="1"
                    :max="eventDays"
                    required
                    outlined
                    type="number"
                  ></v-text-field>
                  <v-col cols="12" md="12">
                    <h1 class="title">Başlangıç Saati</h1>
                    <v-time-picker v-model="eventdetail.startTime" format="24hr" :landscape="$vuetify.breakpoint.smAndUp"></v-time-picker>
                  </v-col>
                   <v-col>
                    <h1 class="title">Bitiş Saati</h1>
                    <v-time-picker v-model="eventdetail.endTime" :min="eventdetail.startTime" format="24hr" :landscape="$vuetify.breakpoint.smAndUp"></v-time-picker>
                  </v-col>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" :disabled="!formValid" @click="save">
              <v-icon left class="hidden-sm-and-down">fa fa-save</v-icon>
              <v-icon class="hidden-sm-and-up">fa fa-save</v-icon>
              <span>Kaydet</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {NEW_EVENTDETAIL} from '@/store/action.type';
import eventDetailEntity from "@/entity/eventdetail";
const initialize = () => {
  return Object.assign({}, eventDetailEntity);
};
export default {
  props: ["item"],
  data: () => ({
    eventDays: 0,
    eventdetail: initialize(),
    formValid: false,
    nameRule: [
      v => !!v || "Konuşmacı Adı Gereklidir",
      v => v.length <= 50 || "Konuşmacı Adı 50 Karakterden Uzun Olamaz"
    ],
    descriptionRule: [v => !!v || "Açıklama Gereklidir"]
  }),
  methods: {
    goBack() {
      this.$router.push({ path: "/Home" });
    },
    save() {
      if (this.formValid) {
        this.$store.dispatch(NEW_EVENTDETAIL,this.eventdetail).then((response)=>{
          this.$swal('BAŞARILI',response.errMessage,'success').then(()=>{
            this.$router.push({path:'/Home'})
          })
        }).catch((err)=>{          
          this.$swal('HATA',err.errMessage,'error')
        })
      }
    }
  },
  beforeMount() {
    if (this.item === undefined) {
      this.$router.push({ path: "/Home" });
    } else {
      var start = this.moment(this.item.startDate);
      var end = this.moment(this.item.endDate);
      this.eventDays =
        end.diff(start, "days") > 0 ? end.diff(start, "days") : 1;
        this.eventdetail.eventId = this.item.id;        
    }
  }
};
</script>