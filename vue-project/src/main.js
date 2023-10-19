import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import BalmUI from 'balm-ui'; // Official Google Material Components
import BalmUIPlus from 'balm-ui-plus'; // BalmJS Team Material Components
import 'balm-ui-css';

const app = createApp(App)

app.use(BalmUI);
app.use(BalmUIPlus);
app.use(createPinia())

app.mount('#app')


// Your hair is fair
// As the summer gamer sweat
// Like perfume
// To my nostrils
// As I watch you on twitch

// So deft in dark souls
// So daft in legion
// Why do you tease me?
// With nilla cams? With treason?

// I love your trolling
// I love your cajoling
// I will be your sub
// Until your head starts rolling <3
