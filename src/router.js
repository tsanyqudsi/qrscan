import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import PersonalBlog from './views/PersonalBlog.vue';
import UserProfileLite from './views/UserProfileLite.vue';
import AddNewPost from './views/AddNewPost.vue';
import Errors from './views/Errors.vue';
import ComponentsOverview from './views/ComponentsOverview.vue';
import BlogPosts from './views/BlogPosts.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import QRScan from './views/Qr_scan.vue';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  // linkActiveClass: 'active',
  // linkExactActiveClass: 'exact-active',
  // scrollBehavior() {
  //   return { x: 0, y: 0 };
  // },
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { layout:'non-admin' },
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      meta: { layout:'non-admin' },
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      meta: { layout:'non-admin' },
      component: Register,
    },
    {
      path: '/qrscan',
      name: 'qrscan',
      meta: { layout:'non-admin' },
      component: QRScan,
    },
    {
      path: '/blog-overview',
      name: 'blog-overview',
      component: PersonalBlog,
    },
    {
      path: '/user-profile-lite',
      name: 'user-profile-lite',
      component: UserProfileLite,
    },
    {
      path: '/add-new-post',
      name: 'add-new-post',
      component: AddNewPost,
    },
    {
      path: '/errors',
      name: 'errors',
      component: Errors,
    },
    {
      path: '/components-overview',
      name: 'components-overview',
      component: ComponentsOverview,
    },
    {
      path: '/admin/tables',
      name: 'tables',
      component: () => import('./views/Tables.vue'),
    },
    {
      path: '/blog-posts',
      name: 'blog-posts',
      component: BlogPosts,
    },
    {
      path: '/not-admin',
      name: 'not-admin',
      component: () => import('./views/NotAdmin.vue'),
    },
    {
      path: '*',
      redirect: '/errors',
    },
  ],
});
