import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import './styles/styles.scss'
import elementPlus from 'element-plus'
import VueCarousel from '@chenfengyuan/vue-carousel';
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(elementPlus)
app.component(VueCarousel.name, VueCarousel);
app.use(router)
app.use(store)
app.mount('#app')
