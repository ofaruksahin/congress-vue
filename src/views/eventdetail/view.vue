<template>
  <v-row align="start" justify="center" class="ma-2">
    <v-col cols="12" sm="12" md="10">
      <v-card>
        <v-tabs v-model="tab" background-color="primary" centered dark icons-and-text>
          <v-tabs-slider></v-tabs-slider>

          <v-tab href="#event_info">
            Etkinlik Bilgileri
            <v-icon>fa fa-info</v-icon>
          </v-tab>

          <v-tab href="#event_timeline">
            Etkinlik Akışı
            <v-icon>fa fa-stream</v-icon>
          </v-tab>

          <v-tab href="#event_participant">
            Katılımcılar
            <v-icon>fa fa-users</v-icon>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item value="event_info">
            <v-card flat>
              <v-card-text>
                <eventinfo :eventinfo="eventInfo" :user="user"/>
              </v-card-text>
            </v-card>
          </v-tab-item>     
          <v-tab-item value="event_timeline">
            <v-card flat>
              <v-card-text>
                <eventtimeline :timeline="eventDetails" :event="eventInfo"/>
              </v-card-text>
            </v-card>
          </v-tab-item>  
          <v-tab-item value="event_participant">
            <v-card flat>
              <v-card-text>
                <eventparticipant :participants="eventParticiants"/>
              </v-card-text>
            </v-card>
          </v-tab-item>        
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { EVENT_GET_ALL_DATA } from "@/store/action.type";
import eventEntity from "@/entity/event";
import eventinfo from '@/components/eventView/eventinfo';
import eventtimeline from '@/components/eventView/eventdetail';
import eventparticipant from '@/components/eventView/eventparticipant';
export default {
  components:{
    eventinfo,
    eventtimeline,
    eventparticipant
  },
  data: () => ({
    tab: 'event_info',
    eventInfo: {},
    eventDetails:[],
    eventParticiants:[],
    user:{}
  }),
  created() {
    let eventObject = Object.assign({}, eventEntity);
    eventObject.id = this.$route.params.id;
    this.$store
      .dispatch(EVENT_GET_ALL_DATA, eventObject)
      .then(() => {
        this.eventInfo = this.$store.getters.getEvent;
        this.eventDetails = this.$store.getters.getEventDetails;
        this.eventParticiants = this.$store.getters.getEventParticipants;    
        this.user = this.$store.getters.getEventCreator;    
      })
      .catch(err => {
        this.$swal("HATA", err.errMessage, "error").then(() => {
          this.$router.push({ path: "/Home" });
        });
      });
  }
};
</script>