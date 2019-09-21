import Vue from 'vue'
import Vuex from 'vuex'

import base from './base.module';
import user from './user.module';
import sponsor from './sponsor.module';
import business from './business.module';
import participant from './participant.module';

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    base,
    user,
    sponsor,
    business,
    participant
  }
})
