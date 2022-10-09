import Layout from '@/components/layout/frame/Layout.vue'

export default [{
        path: '/',
        component: Layout,
        redirect: '/index',
        meta: {
            hasTabs: true,
        },
        children: [{
                path: '/index',
                name: 'Index',
                component: () => import('@/views/common/index.vue'),
                meta: {
                    title: '首页',
                    affix: true
                }
            },
            {
                name: '403',
                path: '/403',
                component: () => import('@/views/common/403.vue'),
                meta: {
                    title: '403',
                }
            },
            {
                name: '500',
                path: '/500',
                component: () => import('@/views/common/500.vue'),
                meta: {
                    title: '500',
                }
            },
        ],
    },
    {
        name: 'noHasPermissions',
        path: '/no-has-permissions',
        component: () => import('@/views/common/no-has-permissions.vue'),
    },
    {
        name: 'noHasPermissionsNoRouter',
        path: '/no-has-permissions-no-router',
        component: () => import('@/views/common/no-has-permissions.vue'),
        meta: {
            hasLogin: false
        }
    },
    {
        name: 'Login',
        path: '/login',
        component: () => import('@/views/common/login.vue')
    },

    // 404 not found
    {
        name: '404',
        path: '/404',
        component: () => import('@/views/common/404.vue')
    },
    {
        path: `/:pathMatch(.*)*`,
        redirect: '/404'
    },
]