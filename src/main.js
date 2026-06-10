import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { scrollReveal } from './directives/scrollReveal'
import './assets/styles/main.scss'

createApp(App)
  .use(router)
  .directive('scroll-reveal', scrollReveal)
  .mount('#app')
