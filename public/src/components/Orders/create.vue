<template>
    <b-container>
        <h1>Create a Order</h1>

        <b-alert show variant="danger" v-if="errors.length">
            <strong class="alert-heading">Please correct the following error(s):</strong>
            <ul>
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
        </b-alert>

        <b-form @submit.prevent>
            <b-form-group id="input-group-1" label="Order:" label-for="Order">
                <b-form-input required type="text" class="form-control" id="title" v-model="Order.name"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Delivery_address:" label-for="delivery_address">
                <b-form-textarea required class="form-control" id="delivery_address" v-model="Order.delivery_address" rows="8"></b-form-textarea>
            </b-form-group>

            <b-form-group id="input-group-4" label="Quantity:" label-for="quantity">
                <b-form-input required type="number" class="form-control" id="quantity" v-model="Order.quantity"></b-form-input>
            </b-form-group>


            <b-button variant="primary" @click="createOrder">Create Order</b-button>
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
            Order:  {
                name: '',
                quantity: 0,
                delivery_address: ''
            }
        }
    },

    methods: {
        createOrder(event) {
            this.errors = [];

            if (!this.Order.name) {
                this.errors.push('title name');
            }
            if (!this.Order.delivery_address) {
                this.errors.push('delivery_address description');
            }

            if (!this.errors.length) {
                const url = '/api/orders';
                const param = this.Order;

                axios.post(url, param)
                    .then((response) => {
                        window.location.href = '/orders';
                    })
                    .catch((error) => {
                        Swal.fire('Error!', 'The operation could not be completed.', 'error');
                        console.log(error);
                    });
            }

            event.preventDefault();
        }
    }
}
</script>
