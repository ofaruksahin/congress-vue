import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/user/login';
import Register from '@/views/user/register';
import ForgotPassword from '@/views/user/forgotPassword';
import Home from '@/views/dashboard/index';
import Sponsor from '@/views/sponsor/index';
import Business from '@/views/business/index';
import NewBusiness from '@/views/business/new';
import Participant from '@/views/participant/index';
import Profile from '@/views/profile/index';
import Events from '@/views/events/index';
import newEvent from '@/views/events/new';
import eventDetail from '@/views/events/detail';
import newEventSpeaker from '@/views/eventdetail/new';
import updateEventSpeaker from '@/views/eventdetail/update'
import newParticipant from '@/views/eventparticipant/index';
import Categories from '@/views/category/index';
import NewCategory from '@/views/category/new';
import UpdateCategory from '@/views/category/update';
import NewEventCategory from '@/views/eventcategory/new';
import NewSponsor from '@/views/sponsor/new';
import AddSponsorEvent from '@/views/eventsponsor/index';
import PushNotification from '@/views/pushnotification/index';
import NewUserInterest from '@/views/userinterest/new';
import ViewEventDetail from '@/views/eventdetail/view';
import ActivationUser from '@/views/user/activationUser';

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
    },
    {
      name:'/Business',
      path:'/Business',
      component:Business
    },
    {
      name:'/NewBusiness',
      path:'/NewBusiness',
      component:NewBusiness
    },
    {
      name:'/Participant',
      path:'/Participant',
      component:Participant
    },
    {
      name:'/Profile',
      path:'/Profile',
      component:Profile
    },
    {
      name:'/Events',
      path:'/Events',
      component : Events
    },
    {
      name:'/NewEvent',
      path:'/NewEvent',
      component:newEvent
    },
    {
      name:'/eventDetail',
      path:'/eventDetail',
      component:eventDetail,
      props:true
    },
    {
      name:'/newEventSpeaker',
      path:'/newEventSpeaker',
      component:newEventSpeaker,
      props:true
    },
    {
      name:'/updateEventSpeaker',
      path:'/updateEventSpeaker',
      component:updateEventSpeaker,
      props:true
    },
    {
      name:'/NewParticipant',
      path:'/NewParticipant',
      component:newParticipant,
      props : true
    },
    {
      name:'/Categories',
      path:'/Categories',
      component:Categories
    },
    {
      name:'/NewCategory',
      path:'/NewCategory',
      component:NewCategory
    },
    {
      name:'/UpdateCategory',
      path:'/UpdateCategory',
      component:UpdateCategory,
      props : true
    },
    {
      name:'/NewEventCategory',
      path:'/NewEventCategory',
      component:NewEventCategory,
      props:true
    },
    {
      name:'/NewSponsor',
      path:'/NewSponsor',
      component:NewSponsor
    },
    {
      name:'/AddSponsorEvent',
      path:'/AddSponsorEvent',
      component:AddSponsorEvent,
      props:true
    },
    {
      name:'/SendNotification',
      path:'/SendNotification',
      component:PushNotification
    },
    {
      name:'/NewUserInterest',
      path:'/NewUserInterest',
      component:NewUserInterest
    },
    {
      name:'/ViewEventDetail',
      path:'/ViewEventDetail/:id',
      component:ViewEventDetail
    },
    {
      name:'/ActivationAccount',
      path:'/ActivationAccount/:guid',
      component:ActivationUser
    }
  ]
})
