<template>
    <div>
        <b-navbar toggleable="md" type="dark" variant="info">
            <b-navbar-brand to="/">My Vue App</b-navbar-brand>
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-collapse id="nav_collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/products">Products</b-nav-item>
                    <b-nav-item to="/Orders">Orders</b-nav-item>
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                        <template slot="button-content">User</template>
                        <b-dropdown-item to="/login" v-if="!isLoggedIn">Login</b-dropdown-item>
                        <b-dropdown-item to="/register" v-if="!isLoggedIn">Register</b-dropdown-item>
                        <b-dropdown-item @click="logout" v-if="isLoggedIn">Logout</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        
        <router-view />
    </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from 'axios';

export default {
    created: function() {
        this.$http.interceptors.response.use(undefined, function (err) {
            return new Promise(function (resolve, reject) {
                if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                    this.$store.dispatch(logout);
                }
                throw err;
            });
        });
    },
    
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn;
        }
    },

    methods: {
        logout: function () {
            this.$store.dispatch('logout')
                .then(() => {
                    this.$router.push('/login');
                });
        }
    }
}
</script>
