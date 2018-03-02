import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import UsersController from '@/components/UsersController'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/users',
      name: 'UsersController',
      component: UsersController
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})
