import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './router'
import registerGlobalComponents from './plugins/global-components'

const app = createApp(App)
registerGlobalComponents(app)
app.use(createPinia())
app.use(router)

app.mount('#app')
