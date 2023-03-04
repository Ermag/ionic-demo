import { useAuthStore } from '../store';
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/LoginScreen.vue')
  },
  {
    path: '/',
    redirect: '/tabs/home'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        name: 'home',
        path: 'home',
        component: () => import('@/views/Tab1Page.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next): Promise<void> => {
  const { requiresAuth } = to.meta;
  const { isLoggedIn } = useAuthStore();
  
  if (requiresAuth && !isLoggedIn) {
    return next({ name: 'login' });
  }
  
  next();
})

export default router
