<template>
    <b-container>
        <h1>Register a Account</h1>

        <b-alert show variant="danger" v-if="errors.length">
            <strong class="alert-heading">Please correct the following error(s):</strong>
            <ul>
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
        </b-alert>

        <b-form @submit.prevent>
            <b-form-group id="input-group-1" label="Email:" label-for="email">
                <b-form-input required type="email" class="form-control" id="email" v-model="user.email"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Username:" label-for="username">
                <b-form-input required type="text" class="form-control" id="username" v-model="user.username"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="password:" label-for="password">
                <b-form-input required type="password" class="form-control" id="password" v-model="user.password"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="password confirm:" label-for="confirm">
                <b-form-input required type="password" class="form-control" id="confirm" v-model="user.confirm"></b-form-input>
            </b-form-group>

            <b-button variant="primary" v-on:click="register">Register</b-button>
        </b-form>
    </b-container>
</template>


<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            errors: [],
            user:  {
                email: '',
                username: '',
                password: '',
                confirm: ''
            }
        }
    },

    methods: {
        register: function(user) {
            this.errors = [];
            let email = this.user.email;
            let username = this.user.username;
            let password = this.user.password;
            let confirm = this.user.confirm;

            if (!email) {
                this.errors.push('Email required');
            } else {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(!re.test(email)){
                    this.errors.push('Invalid email');
                }
            }
            if (!username) {
                this.errors.push('Username required');
            }
            if (!password) {
                this.errors.push('Password required');
            }
            if (password != confirm) {
                this.errors.push('Password does not match');
            }

            if (!this.errors.length) {
                const url = '/api/register';
                const param = user;

                this.$store.dispatch('register', { email, username, password, confirm })
                    .then(() => this.$router.push('/'))
                    .catch(err => console.log(err));
            }
        }
    }
}
</script>
