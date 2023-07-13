import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteParams, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
// import { isAuthorized } from './store/user'
// 这里暂时硬编码，等实现了登录功能后再从全局状态库中动态获取
// true:已登录  false:未登录
const isAuthorized = () => false

export type AppRouteNames =
  | 'global-feed'
  | 'my-feed'
  | 'tag'
  | 'article'
  | 'create-article'
  | 'edit-article'
  | 'login'
  | 'register'
  | 'profile'
  | 'profile-favorites'
  | 'settings'

export const routes: RouteRecordRaw[] = [
  {
    name: 'global-feed',
    path: '/',
    component: Home,
  },
  {
    name: 'my-feed',
    path: '/my-feeds',
    component: Home,
  },
  {
    name: 'tag',
    path: '/tag/:tag',
    component: Home,
  },
  {
    name: 'article',
    path: '/article/:slug',
    component: () => import('../views/Article.vue'),
  },
  {
    name: 'edit-article',
    path: '/article/:slug/edit',
    component: () => import('../views/EditArticle.vue'),
  },
  {
    name: 'create-article',
    path: '/article/create',
    component: () => import('../views/EditArticle.vue'),
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/Login.vue'),
    // 路由独享守卫,防止已登录用户再次进入登录页面 
    beforeEnter: () => !isAuthorized(),
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('../views/Register.vue'),
    // 路由独享守卫,防止已登录用户进入注册页面
    beforeEnter: () => !isAuthorized(),
  },
  {
    name: 'profile',
    path: '/profile/:username',
    component: () => import('../views/Profile.vue'),
  },
  {
    name: 'profile-favorites',
    path: '/profile/:username/favorites',
    component: () => import('../views/Profile.vue'),
  },
  {
    name: 'settings',
    path: '/settings',
    component: () => import('../views/Settings.vue'),
  },
]
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export function routerPush (name: AppRouteNames, params?: RouteParams): ReturnType<typeof router.push> {
  return params !== undefined
    ? router.push({
      name,
      params,
    })
    : router.push({ name })
}