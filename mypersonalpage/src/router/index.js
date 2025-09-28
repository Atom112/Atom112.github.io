import { createRouter, createWebHistory } from 'vue-router'
import layout from '@/layout/layout.vue'
import constructionpage from '@/view/constructionpage.vue'
import loginpage from '@/view/loginpage.vue'
import HomePage from '@/view/HomePage.vue'

const routes = [
    {
      path: '/',
      component: layout,
      children: [
        {
          path: 'home',
          name: 'Home',
          component: HomePage
        }
      ]
    },
    {
      path: '/construction',
      name: 'Construction',
      component: constructionpage
    },
    {
      path:'/login',
      component:loginpage
    }
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
