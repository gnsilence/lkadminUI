/*
 * @Author: gongnan
 * @Date: 2022-04-24 10:29:59
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-09 13:55:23
 * @Description: file content
 * @FilePath: \front\src\main.js
 */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import scui from './scui'
import i18n from './locales'
import router from './router'
import store from './store'
import { createApp } from 'vue'
import App from './App.vue'
import vxetable from "./vxetable.config";
const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus, {size: 'default'});
app.use(i18n);
app.use(scui);
app.use(vxetable);

//挂载app
app.mount('#app');
