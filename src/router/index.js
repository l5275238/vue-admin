import Vue from 'vue'
import Router from 'vue-router'
import prodoctRoute from './modular/product'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true ,  meta: { title: '登录', icon: 'table' },},
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,

    children: [{
      path: 'dashboard',
      meta: { title: '首页', icon: 'table' },
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: 'order',
    meta: { title: '订单管理', icon: 'table' },
    children: [{
      path: 'list',
      component: () => import('@/views/order/orderList'),
      meta: { title: '订单管理', icon: 'table' }
    },
      {
        path: 'addOrder',
        hidden:true,
        component: () => import('@/views/order/addOrder'),
        meta: { title: '编辑订单', icon: 'table' }
      }
    ]
  },
  {
    path: '/people',
    component: Layout,
    redirect: '/people/list',
    name: 'people',
    meta: { title: '人员管理 ', icon: 'table' },
    children: [{
      path: 'list',
      name: "peopleList",
      component: () => import('@/views/people/peopleList'),
      meta: { title: '人员统计', icon: 'table' }
    }]
  },
  {
    path: '/financial',
    component: Layout,
    redirect: '/financial/jxs',
    name: 'financial',
    meta: { title: '财务管理', icon: 'table' },
    children: [{
      path: 'jxs',
      name:"jxs",
      component: () => import('@/views/financial/jxs'),
      meta: { title: '经销商统计', icon: 'table' }
    },
      {
        path: 'store',
        name:"store",
        component: () => import('@/views/financial/store'),
        meta: { title: '门店统计', icon: 'table' }
      },
      {
        path: 'yszk',
        name:"yszk",
        component: () => import('@/views/financial/yszk'),
        meta: { title: '应收账款', icon: 'table' }
      }


    ]
  },
  prodoctRoute,
  {
    path: '/wareHouse',
    component: Layout,
    redirect: '/wareHouse/wareHouse',
    name: 'wareHouse',
    meta: { title: '仓库管理', icon: 'table' },
    children: [{
      path: 'wareHouse',
      name:"wareHouse",
      component: () => import('@/views/wareHouse/wareHouse'),
      meta: { title: '仓库管理', icon: 'table' }
    },
      {
        path: 'addWareHouse',
        name:"addWareHouse",
        hidden: true,
        component: () => import('@/views/wareHouse/addWareHouse'),
        meta: { title: '新增仓库', icon: 'table' }
      },
      {
        path: 'out',
        name:"out",
        component: () => import('@/views/wareHouse/out'),
        meta: { title: '出库', icon: 'table' }
      },
      {
        path: 'put',
        name:"put",
        component: () => import('@/views/wareHouse/put'),
        meta: { title: '入库', icon: 'table' }
      },
      {
        path: 'purchase',
        name:"purchase",
        component: () => import('@/views/wareHouse/purchase'),
        meta: { title: '采购', icon: 'table' }
      },
      {
        path: 'editProduct',
        name: "editProduct",
        component: () => import('@/views/wareHouse/editProduct'),
        meta: { title: '出入库单编辑', icon: 'table' }
      }



    ]
  },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]


console.log(constantRouterMap);
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

