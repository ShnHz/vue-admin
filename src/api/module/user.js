import base from '../base'; // 导入接口域名列表

const user = {
    // 心跳包
    keepAlive(params) {
        return window.$vueApp.config.globalProperties.$http.post(`${base.api_admin}/keep_alive/`, params, {
            nprogress: false
        });
    },
    // 登录
    login(params){
        return window.$vueApp.config.globalProperties.$http.post(`${base.api_admin}/login/`, params, {});
    },
    // 退出登录
    logout(params) {
        return window.$vueApp.config.globalProperties.$http.post(`${base.api_admin}/logout/`, params, {});
    },
    // 获取用户信息    
    getUserInfo(params) {
        return window.$vueApp.config.globalProperties.$http.post(`${base.api_admin}/user_info/`, params, {
            nprogress: false
        });
    },
    // 获取导航栏信息
    getNavInfo(params) {
        return window.$vueApp.config.globalProperties.$http.get(`${base.api_admin}/menu/`, {
            params: params,
            nprogress: false
        });
    },
    // 获取用户列表    
    getUserList(params) {
        return window.$vueApp.config.globalProperties.$http.post(`${base.api_admin}/user_list/`, params, {
            nprogress: false
        });
    },
    // 修改用户信息    
    setUserInfo(params) {
        return window.$vueApp.config.globalProperties.$http.post(`${base.api_admin}/update_info/`, params, {
            nprogress: false
        });
    }
}

export default user;