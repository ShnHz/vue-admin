/*
 * @Author: sanghangning 
 * @Date: 2019-12-11 10:48:06 
 * @Last Modified by: sanghangning
 * @Last Modified time: 2022-10-09 14:59:49
 */
// common
import Empty from '@/components/common/Empty.vue'
import Image from '@/components/common/Image.vue'
import NoPermisssions from '@/components/common/NoPermisssions.vue'
import UrlParam from '@/components/common/UrlParam.vue'

// layout
import SubTitleWrap from '@/components/layout/SubTitleWrap.vue'

// plugins
// 

const components = {
    Empty,
    NoPermisssions,
    Image,
    UrlParam,
    SubTitleWrap,
}

export default {
    install(Vue) {
        for (let key in components) {
            Vue.component(key, components[key]);
        }
    },
};