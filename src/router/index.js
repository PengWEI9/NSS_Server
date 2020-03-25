import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Device List', icon: 'dashboard' }
    }]
  },
  {
    path: '/data',
    component: Layout,
    redirect: '/data/history',
    children: [{
      path: 'history',
      name: 'history',
      component: () => import('@/views/data/index'),
      meta: { title: 'Vols Data', icon: 'datas' }
    }]
  },
  {
    path: '/config',
    component: Layout,
    redirect: '/config/names',
    name: 'config',
    meta: { title: 'Device Setting', icon: 'setting' },
    children: [
      {
        path: 'names',
        name: 'names',
        component: () => import('@/views/setting/names/index'),
        meta: { title: 'Device Names', icon: 'names' }
      },
      {
        path: 'alarm',
        name: 'alarm',
        component: () => import('@/views/setting/alarm/index'),
        meta: { title: 'Alarm Param', icon: 'alarm' }
      },
      {
        path: 'relayinit',
        name: 'relayinit',
        component: () => import('@/views/setting/system/relayinit/index'),
        meta: { title: 'Relay Init', icon: 'relay' }
      },
      {
        path: 'relaystart',
        name: 'relaystart',
        component: () => import('@/views/setting/system/relaystart/index'),
        meta: { title: 'Relay Start', icon: 'relay' }
      },
      {
        path: 'delay',
        name: 'delay',
        component: () => import('@/views/setting/system/delay/index'),
        meta: { title: 'Delay Time', icon: 'delay' }
      },
      {
        path: 'pulse',
        name: 'pluse',
        component: () => import('@/views/setting/system/ptime/index'),
        meta: { title: 'Pulse Time', icon: 'pulse' }
      }

    ]
  },
  {
    path: '/info',
    component: Layout,
    redirect: '/info/baseinfo',
    name: 'Example',
    meta: { title: 'User Center', icon: 'usersetting' },
    children: [
      {
        path: 'baseinfo',
        name: 'baseinfo',
        component: () => import('@/views/info/baseinfo/index'),
        meta: { title: 'Info', icon: 'info' }
      },
      {
        path: 'password',
        name: 'password',
        component: () => import('@/views/info/password/index'),
        meta: { title: 'Password', icon: 'password' }
      }
    ]
  }

]
export const asyncRoutes = [
  {
    path: '/device',
    component: Layout,
    redirect: '/device/manager',
    name: 'device',
    meta: { roles: 'root' },
    children: [
      {
        path: 'manager',
        name: 'manager',
        component: () => import('@/views/device/manager/index'),
        meta: { title: 'Device Manager', icon: 'devices' }
      },
      {
        path: 'add',
        name: 'add',
        hidden: true,
        component: () => import('@/views/device/deal/index'),
        meta: { title: 'Device Add', icon: 'table' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/manager',
    name: 'user',
    meta: { roles: 'root' },
    children: [
      {
        path: 'manager',
        name: 'manager',
        component: () => import('@/views/user/manager/index'),
        meta: { title: 'User Manager', icon: 'account' }
      },
      {
        path: 'add',
        name: 'add',
        hidden: true,
        component: () => import('@/views/user/deal/index'),
        meta: { title: 'User Add', icon: 'table' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
