import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store'
import axios from 'axios';


Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
axios.defaults.baseURL = '/';


/* Http Request, Response Handler */
axios.interceptors.request.use(
    config => {
        if (localStorage.token) {
            config.headers["Authorization"] = `Bearer ${localStorage.token}`
        }
        return config;
    },
    error => {
        console.log(error);
        Promise.reject(error);
    }
);
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    localStorage.clear()
                    router.replace("/login");
            }
        }
        return Promise.reject(error.response.data);
    }
);


new Vue ({
    el: '#app',
    store,
    router,
    render: h => h(App),
});