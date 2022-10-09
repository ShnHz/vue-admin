import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// mixin
import Mixins from './utils/mixins';

const app = createApp(App)

// css
import './assets/css/varuables.css'
import './assets/css/result.scss'
import './assets/css/skeleton.css'
import './assets/iconfont/shn-ui/iconfont.css'
import './assets/css/cover-arco-design/index.scss'
import 'nprogress/nprogress.css'

// api
import api from './api';
app.config.globalProperties.$api = api;

// bus
import Bus from './utils/bus';
app.config.globalProperties.$bus = new Bus()

// config
app.config.globalProperties.$window = window
app.config.globalProperties.$document = document
window.$vueApp = app

// components
import globalComponents from './components'
app.use(globalComponents)

// plugins  
import globalPlugins from './plugins/index'
app.use(globalPlugins)



Promise.all([store.dispatch('common/getUserInfo')]).then(() => {
    app.use(store).use(router).mixin(Mixins)
    app.mount('#app')
})