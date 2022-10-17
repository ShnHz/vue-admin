import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './pinia'
import useCommonState from '@pinia/modules/common.js'

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

app.use(pinia).use(router).mixin(Mixins)

const commonState = useCommonState()

Promise.all([commonState.getUserInfo()]).then(() => {
    app.mount('#app')
})