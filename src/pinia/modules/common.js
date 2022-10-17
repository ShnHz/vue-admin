import {
    defineStore
} from 'pinia'
import router from '../../router'
import api from '../../api';

const useCommonStore = defineStore('common', {
    state: () => {
        return {
            token: '',
            userInfo: {
                username: 'Admin'
            },
            navData: [],
            collapsed: false
        }
    },
    getters: {
        getUserAvatar: (state) => {
            return state.userInfo.avatar || new URL('../../assets/img/common/avatar.jpg',
                    import.meta.url)
                .href
        }
    },
    actions: {
        setToken(data) {
            this.token = data
        },
        setUserInfo(data) {
            this.userInfo = data
        },
        setNavData(data) {
            this.navData = data
        },
        setCollapsed(data) {
            this.collapsed = data
        },

        async login() {
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

            this.setUserInfo({
                username: 'Admin',
                userId: 'admin',
            })
            this.setToken('12345')

            let query = router.currentRoute.value.query
            let redirect = query.redirect ? query.redirect : 'Index'
            delete query.redirect
            router.push({
                name: redirect,
                query: query
            })
        },
        async logout() {
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
            localStorage.removeItem('commonStoreKey')
            this.setUserInfo({})
            this.setToken('')
        },
        async getUserInfo() {
            //     await api.user
            //         .getUserInfo()
            //         .then((res) => {
            //             this.setUserInfo({
            //                 ...res.data.data.user_info,
            //                 permission: res.data.data.__permission,
            //             })
            //         })
            //         .catch((error) => {})
        },
    },
    // 持久化存储插件其他配置
    persist: {
        // 修改存储中使用的键名称，默认为当前 Store的 id
        key: 'commonStoreKey',
        // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
        paths: ['token', 'userInfo', 'collapsed'],
    },

})

export default useCommonStore