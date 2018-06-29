import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import store from './store/index'
import basestyle from './style/base.css'
import { Table, TableColumn, Pagination, Input, Button, Dialog} from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

Vue.prototype.$axios = axios;
locale.use(lang)
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Input);
Vue.use(Button);
Vue.use(Dialog);

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
