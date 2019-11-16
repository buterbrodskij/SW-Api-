import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'film',
    component: () => import(/* webpackChunkName: "about" */ '../views/Films.vue'),
  },
  {
    path: '/ships',
    name: 'Ships',
    component: () => import(/* webpackChunkName: "about" */ '../views/Ships.vue'),
  },
  {
    path: '/actors',
    name: 'Actors',
    component: () => import(/* webpackChunkName: "about" */ '../views/Actors.vue'),
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
