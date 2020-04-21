import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首頁'
    }

  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: { title: '關於' }

  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('@/views/Shop.vue'),
    meta: {
      title: '商城'
    }
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('@/views/Details.vue'),
    meta: {
      title: '商品'
    }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('@/views/Checkout.vue'),
    children: [{
      path: 'cart',
      name: 'Cart',
      component: () => import('@/views/cartPages/Cart.vue')
    },

    {
      path: 'customer_checkout/:orderId',
      name: 'Customer_checkout',
      component: () => import('@/views/cartPages/CustomerCheckout.vue')
    }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () =>
      import('@/views/Admin'),
    children: [{
      path: 'products',
      name: 'Products',
      component: () => import('@/views/adminPages/Products.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: 'orders',
      name: 'Orders',
      component: () => import('@/views/adminPages/Orders.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: 'coupons',
      name: 'Coupons',
      component: () => import('@/views/adminPages/Coupons.vue'),
      meta: { requiresAuth: true }
    }]
  },
  {
    path: '/',
    name: 'admin',
    component: () =>
      import('@/views/Admin'),
    children: [
      {
        path: 'order_imitation',
        name: 'Order_imitation',
        component: () => import('@/views/adminPages/OrderImitation.vue')
      },
      {
        path: 'customer_checkout/:orderId',
        name: 'CustomerCheckout',
        component: () => import('@/views/cartPages/CustomerCheckout.vue')
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
