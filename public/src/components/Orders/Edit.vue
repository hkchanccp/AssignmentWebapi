<template>
    <b-container>
        <h1>Edit a Order</h1>

        <b-alert show variant="danger" v-if="errors.length">
            <strong class="alert-heading">Please correct the following error(s):</strong>
            <ul>
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
        </b-alert>
        
        <b-form @submit.prevent>
            <b-form-group id="input-group-1" label="Order:" label-for="Order">
                <b-form-input required type="text" class="form-control" id="Order" v-model="Order.name"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Delivery_address:" label-for="delivery_address">
                <b-form-textarea required class="form-control" id="delivery_address" v-model="Order.delivery_address" rows="8"></b-form-textarea>
            </b-form-group>

            <b-form-group id="input-group-4" label="Quantity:" label-for="quantity">
                <b-form-input required type="number" class="form-control" id="quantity" v-model="Order.quantity"></b-form-input>
            </b-form-group>


            <b-button variant="primary" @click="updateOrder">Update Order</b-button>
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
            Order: {
                _id: '',
                name: '',
                quantity: 0,
                delivery_address: ''
            }
        }
    },

    created: function() {
        this.fetchOrder();
    },

    methods: {
        fetchOrder() {
            const OrderId = this.$route.params.id;
            const url = `/api/orders/${OrderId}`;

            axios.get(url)
                .then((response) => {
                this.Order = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
        },

        updateOrder(event) {
            this.errors = [];

            if (!this.Order.name) {
                this.errors.push('name required');
            }
            if (!this.Order.delivery_address) {
                this.errors.push('delivery_address required');
            }

            if (!this.errors.length) {
                const url = `/api/orders/${this.Order._id}`;
                const param = this.Order;

                axios.patch(url, param)
                    .then((response) => {
                        window.location.href = '/orders'
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