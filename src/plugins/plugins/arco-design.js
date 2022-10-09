/*
 * @Author: sanghangning 
 * @Date: 2021-06-03 09:59:02 
 * @Last Modified by: sanghangning
 * @Last Modified time: 2022-10-09 14:33:19
 */

import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';

import '@arco-design/web-vue/dist/arco.css';

// code 代码高亮
export default function(app) {
    app.use(ArcoVue);
    app.use(ArcoVueIcon);
}