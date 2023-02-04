//导入上面定义的组件
import Home from '@/view/Admin_Home.vue'
// import B from "@/view/BiLi";

const routes = [
    {
        path: '/a',
        component: import('@/view/test/father_a.vue'),
    },
    {
        path: '/',
        component: () => import('@/view/toLogin.vue')
    },
    {
        path: '/Login',
        component: () => import('@/view/toLogin.vue')
    },
    {
        path: '/toLogin',
        component: () => import('@/view/test/test.vue')
    },
    {
        path: '/hello',
        component: () => import('@/view/hello-api.vue')
    },
    {
        path: '/logout',
        component: () => import('@/view/toLogout.vue')
    },
    {
        path: '/admin/index',
        component: () => import('@/view/Admin_Index.vue'),
        children:[
            {
                path: '',
                component: Home,
            },
            {
                path: 'ums_all',
                component: import('@/view/user_ms/admin_ums_all.vue'),
            },
            {
                path: 'ums_vip',
                component: import('@/view/user_ms/admin_ums_vip.vue'),
            },
            {
                path: 'ums_add',
                component: import('@/view/user_ms/admin_ums_add.vue'),
            },
            {
                path: 'ams_all',
                component: import('@/view/article_ms/admin_ams_all.vue'),
            },
            {
                path: 'ams_class',
                component: import('@/view/article_ms/admin_ams_classification.vue'),
            },
            {
                path: 'ams_label',
                component: import('@/view/article_ms/admin_ams_label.vue'),
            },
            {
                path: 'ams_write',
                component: import('@/view/article_ms/admin_ams_write.vue'),
            },
            {
                path: 'gms_all',
                component: import('@/view/goods_ms/admin_gms_all.vue'),
            },
            {
                path: 'gms_takedown',
                component: import('@/view/goods_ms/admin_gms_takedown.vue'),
            },
            {
                path: 'gms_uploaded',
                component: import('@/view/goods_ms/admin_gms_uploaded.vue'),
            },
            {
                path: 'gms_add',
                component: import('@/view/goods_ms/admin_gms_add.vue'),
            },
            {
                path: 'oms_all',
                component: import('@/view/orders_ms/admin_oms_all.vue'),
            },
            {
                path: 'oms_success',
                component: import('@/view/orders_ms/admin_oms_success.vue'),
            },
            {
                path: 'oms_wait',
                component: import('@/view/orders_ms/admin_oms_wait.vue'),
            },
            {
                path: 'oms_abnormal',
                component: import('@/view/orders_ms/admin_oms_abnormal.vue'),
            },
            {
                path: 'oms_refund',
                component: import('@/view/orders_ms/admin_oms_refund.vue'),
            },
            {
                path: 'fms_index',
                component: import('@/view/feedback_ms/admin_fms_index.vue'),
            },
            {
                path: 'wms_list',
                component: import('@/view/work_ms/admin_wms_list.vue'),
            },
            {
                path: 'wms_pending',
                component: import('@/view/work_ms/admin_wms_pending.vue'),
            },
            {
                path: 'wms_processed',
                component: import('@/view/work_ms/admin_wms_processed.vue'),
            },
            {
                path: 'wms_closed',
                component: import('@/view/work_ms/admin_wms_closed.vue'),
            },
            {
                path: 'test',
                component: import('@/view/test/test.vue'),
            }
        ]
    },

];

export default routes
