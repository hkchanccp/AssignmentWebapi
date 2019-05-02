import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: {}
    },

    mutations: {
        auth_request(state) {
	    	state.status = 'loading';
	  	},
	  	auth_success(state, token, user) {
		    state.status = 'success';
		    state.token = token;
		    state.user = user;
	  	},
	  	auth_error(state) {
	    	state.status = 'error';
	  	},
	  	logout(state) {
	    	state.status = '';
	    	state.token = '';
	  	},
    },

    actions: {
        register({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request');
                axios({url: '/api/register', data: user, method: 'POST' })
                    .then(res => {
                        const token = res.data.token;
                        const username = res.data.username;
                        localStorage.setItem('token', token);
                        axios.defaults.headers.common['Authorization'] = token;
                        commit('auth_success', token, username);
                        resolve(res);
                    })
                    .catch(err => {
                        commit('auth_error', err);
                        localStorage.removeItem('token');
                        reject(err);
                    });
            })
        },
        
        login({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request');
                axios({ url: '/api/login', data: user, method: 'POST' })
                    .then(res => {
                        const token = res.data.token;
                        const username = res.data.username;
                        localStorage.setItem('token', token);
                        axios.defaults.headers.common['Authorization'] = token;
                        commit('auth_success', token, username);
                        resolve(res);
                    })
                    .catch(err => {
                        commit('auth_error');
                        localStorage.removeItem('token');
                        reject(err);
                    });
            });
        },

        logout({commit}) {
		    return new Promise((resolve, reject) => {
		      	commit('logout');
		      	localStorage.removeItem('token');
		      	delete axios.defaults.headers.common['Authorization'];
		      	resolve();
		    });
	  	}
    },

    getters : {
        isLoggedIn: state => !!state.token,
	    authStatus: state => state.status
    }
});