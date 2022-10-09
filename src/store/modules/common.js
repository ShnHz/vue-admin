// get：this.$store.state.common.test
// set：this.$store.commit('common/setTest', value)
import {
    remove
} from 'nprogress';
import api from '../../api';
import router from '../../router'

const state = {
    token: '',
    userInfo: {
        username: 'Admin'
    },
    navData: [],
    collapsed: false
}
const mutations = {
    setToken(state, data) {
        state.token = data
    },
    setUserInfo(state, data) {
        state.userInfo = data
    },
    setNavData(state, data) {
        state.navData = data
    },
    setCollapsed(state, data) {
        state.collapsed = data
    },
}
const getters = {
    getUserAvatar: state => {
        return state.userInfo.avatar || new URL('../../assets/img/common/avatar.jpg',
                import.meta.url)
            .href
    }
}
const actions = {
    login(context) {
        return new Promise((resolve, reject) => {
            // api.user
            //     .login()
            //     .then((res) => {
            //         context.commit('common/setUserInfo', {
            //             ...res.data.data.user_info,
            //             permission: res.data.data.__permission,
            //         })
            //         context.commit('common/setToken', res.data.data.__token)
            //         router.push('/')
            //         resolve()
            //     })
            //     .catch((error) => {
            //         reject(error)
            //     })

            localStorage.setItem('token', '12345')
            context.commit('setUserInfo', {
                username: 'Admin',
                userId: 'admin',
            })
            context.commit('setToken', '12345')
            let query = router.currentRoute.value.query
            let redirect = query.redirect ? query.redirect : 'Index'
            delete query.redirect
            router.push({
                name: redirect,
                query: query
            })
            resolve()
        })
    },
    logout(context) {
        return new Promise((resolve, reject) => {
            // api.user
            //     .logout()
            //     .then((res) => {
            //     })
            //     .catch((error) => {
            //         reject(error)
            //     })

            router.push({
                name: 'Login',
                query: {
                    ...router.currentRoute.value.query,
                    redirect: router.currentRoute.value.name
                },
            })
            localStorage.removeItem('token', '12345')
            context.commit('setUserInfo', {})
            context.commit('setToken', '')
            resolve()
        })
    },
    getUserInfo(context) {
        return new Promise((resolve, reject) => {
            //     await api.user
            //         .getUserInfo()
            //         .then((res) => {
            //             context.commit('setUserInfo', {
            //                 ...res.data.data.user_info,
            //                 permission: res.data.data.__permission,
            //             })
            //             context.commit('setToken', res.data.data.__token)
            //         })
            //         .catch((error) => {})

            if (localStorage.getItem('token')) {
                context.commit('setUserInfo', {
                    username: 'Admin',
                    userId: 'admin',
                })
                context.commit('setToken', localStorage.getItem('token'))
            }

            resolve()
        })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}