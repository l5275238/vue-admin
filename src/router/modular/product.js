import load from '../load';
import Layout from '@/views/layout/Layout'
let loadCom=load('product');

const productRoute={
  path: '/product',
  component: Layout,
  redirect: '/list',
  name: '产品',
  meta: { title: '产品管理', icon: 'example' },
  children: [{
    path: 'list',
    component: loadCom('productList'),
    name: 'productList',
    meta: { title: '产品列表', icon: 'example' },
  },
    {
      path: 'add',
      component: loadCom('productAdd'),
      hidden: true,
      name: 'productList',
      meta: { title: '新增产品', icon: 'example' },
    },
  ]

}

export default productRoute;
