import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Login from '../components/Auth/Login.vue';
import Register from '../components/Auth/Register.vue';
import CreateProducts from '../components/Products/Create.vue';
import EditProducts from '../components/Products/Edit.vue';
import ListProducts from '../components/Products/List.vue';
import CreateOrders from '../components/Orders/Create.vue';
import EditOrders from '../components/Orders/Edit.vue';
import ListOrders from '../components/Orders/List.vue';
import NotFound from '../components/404.vue';


Vue.use(Router);

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: ListOrders
        },
        {
            path: '/orders',
            name: 'Home',
            component: ListOrders
        },
        {   path: '/orders/create',
            name: 'CreateOrders',
            component: CreateOrders,
            meta: { 
                requiresAuth: true
            }

        },
        {
            path: '/orders/:id',
            name: 'EditOrders',
            component: EditOrders,
            meta: { 
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/products',
            name: 'ListProducts',
            component: ListProducts
        },
        {
            path: '/products/create',
            name: 'CreateProducts',
            component: CreateProducts,
            meta: { 
                requiresAuth: true
            }
        },
        {
            path: '/products/:id',
            name: 'EditProducts',
            component: EditProducts,
            meta: { 
                requiresAuth: true
            }
        },
        {
            path: '*',
            name: 'NotFound',
            component: NotFound
        }
    ]
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next();
            return;
        }
        next('/login');
    } else {
        next();
    }
})


export default router;