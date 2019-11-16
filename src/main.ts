import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/styles/main.less';

Vue.config.productionTip = false;

export const bus = new Vue();
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
