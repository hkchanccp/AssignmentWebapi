<template>
    <b-container>
        <h1>Create a Product</h1>

        <b-alert show variant="danger" v-if="errors.length">
            <strong class="alert-heading">Please correct the following error(s):</strong>
            <ul>
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
        </b-alert>

        <b-form @submit.prevent>
            <b-form-group id="input-group-1" label="Title:" label-for="name">
                <b-form-input required type="text" class="form-control" id="title" v-model="product.name"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Content:" label-for="description">
                <b-form-textarea required class="form-control" id="content" v-model="product.description" rows="8"></b-form-textarea>
            </b-form-group>

            <b-form-group id="input-group-3" label="Price:" label-for="price">
                <b-form-input required type="number" class="form-control" id="price" v-model="product.price"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Quantity:" label-for="quantity">
                <b-form-input required type="number" class="form-control" id="quantity" v-model="product.quantity"></b-form-input>
            </b-form-group>

            <b-button variant="primary" @click="createProduct">Create Product</b-button>
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
            product:  {
                name: '',
                description: '',
                price: 0.0,
                quantity: 0,
                imageUrl: ''
            }
        }
    },

    methods: {
        createProduct(event) {
            this.errors = [];

            if (!this.product.name) {
                this.errors.push('title name');
            }
            if (!this.product.description) {
                this.errors.push('content description');
            }

            if (!this.errors.length) {
                const url = '/api/products';
                const param = this.product;

                axios.post(url, param)
                    .then((response) => {
                        window.location.href = '/products';
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
