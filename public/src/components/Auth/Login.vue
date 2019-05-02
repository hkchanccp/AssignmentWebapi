<template>
    <b-container>
        <h1>Login</h1>

        <b-alert show variant="danger" v-if="errors.length">
            <strong class="alert-heading">Please correct the following error(s):</strong>
            <ul>
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
        </b-alert>

        <b-form @submit.prevent>
            <b-form-group id="input-group-1" label="Username:" label-for="username">
                <b-form-input required type="text" class="form-control" id="username" v-model="user.username"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="password:" label-for="password">
                <b-form-input required type="password" class="form-control" id="password" v-model="user.password"></b-form-input>
            </b-form-group>

            <b-button variant="primary" v-on:click="login">Login</b-button>
        </b-form>
    </b-container>
</template>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            errors: [],
            user:  {
                username: '',
                password: '',
            }
        }
    },

    methods: {
        login: function() {
            this.errors = [];
            let username = this.user.username;
            let password = this.user.password;

            if (!username) {
                this.errors.push('Username required');
            }
            if (!password) {
                this.errors.push('Password required');
            }

            if (!this.errors.length) {
                this.$store.dispatch('login', { username, password })
                    .then(() => this.$router.push('/'))
                    .catch((err) => console.log(err));
            }
        }
    }
}
</script>