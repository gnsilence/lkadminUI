/*
 * @Author: gongnan
 * @Date: 2022-04-24 10:29:59
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-07 17:03:40
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
import vextable from "./VxeTableConfig";
const app = createApp(App);
app.use(vextable.useTable)
app.use(store);
app.use(router);
app.use(ElementPlus, {size: 'default'});
app.use(i18n);
app.use(scui);

//挂载app
app.mount('#app');
