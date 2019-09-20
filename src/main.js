import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store'
import ApiService from '@/common/api.service';
import { setupComponents } from './store/setup.component';
import { CHECK_USER } from './store/action.type';

Vue.config.productionTip = false

ApiService.init();
setupComponents(Vue);

router.beforeEach((to, from, next) => {
  store.dispatch(CHECK_USER);
  const isAuthenticated = store.getters.isAuthenticated; 
  if(isAuthenticated){
    if(to.path === '/'){
      next(false);
    }
    else{
      next();
    }
  }
  if (!isAuthenticated) {
    if (to.path != '/' &&
      to.path != '/Register' &&
      to.path != '/ForgotPassword' &&
      to.path != '/Home'
    ) {      
      next(false)
    }else{
      next();
    }
    
  }
})

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')