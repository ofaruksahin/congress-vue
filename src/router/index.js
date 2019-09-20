import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/user/login';
import Register from '@/views/user/register';
import ForgotPassword from '@/views/user/forgotPassword';
import Home from '@/views/dashboard/index';
import Sponsor from '@/views/sponsor/index';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name :'/',
      path:'/',
      component : Login
    },
    {
      name:'Register',
      path:'/Register',
      component : Register,
    },
    {
      name:'ForgotPassword',
      path:'/ForgotPassword',
      component:ForgotPassword
    },
    {
      name:'/Home',
      path :'/Home',
      component : Home
    },
    {
      name: '/Sponsor',
      path :'/Sponsorlar',
      component : Sponsor
    }
  ]
})