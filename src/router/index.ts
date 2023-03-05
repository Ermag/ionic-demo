import { useAuthStore } from '../store';
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import AppFrame from '../views/AppFrame.vue'

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
    component: AppFrame,
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        name: 'home',
        path: 'home',
        component: () => import('../views/CameraScreen.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'logs',
        path: 'logs',
        component: () => import('../views/LogsScreen.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'settings',
        path: 'settings',
        component: () => import('../views/SettingsScreen.vue'),
        meta: {
          requiresAuth: true
        }
      },
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
  } else if (isLoggedIn && to.name === 'login') {
    return next({ name: 'home' });
  }
  
  next();
})

export default router
