<template>
    <b-container>
        <b-row>
            <h1>Product List</h1>
        </b-row>

        <b-row>
            <b-button variant="primary" style="color: #ffffff; margin: 20px;"><a href="products/create" style="color: #ffffff;">Create New Product</a></b-button>
        </b-row>

        <b-row>
            <b-table striped hover :items="items" :fields="fields" :busy="isBusy">
                <div slot="table-busy" class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                </div>

                <template slot="actions" slot-scope="data">
                    <b-button variant="warning" v-bind:href="'products/' + data.item._id">Update</b-button>
                    <b-button variant="danger" v-on:click="deleteProduct(data.item._id)">Delete</b-button>
                </template>
            </b-table>
        </b-row>
    </b-container>
</template>


<script>
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            fields: [
                {
                    key: 'name',
                    sortable: true
                },
                {
                    key: 'description',
                    sortable: false
                },
                {
                    key: 'price',
                    formatter: value => {
                        return '$' + value.$numberDecimal;
                    },
                    sortable: true
                },
                {
                    key: 'quantity',
                    sortable: false
                },
                {
                    key: 'date',
                    formatter: value => {
                        return moment(value).format('LLL');
                    },
                    sortable: true
                },
                {
                    key: 'actions',
                    sortable: false  
                }
            ],
            items: [],
            isBusy: false
        }
    },

    mounted: function () {
        this.fetchProducts();
    },

    methods: {
        fetchProducts() {
            const url = '/api/products/';
            this.isBusy = true;

            axios.get(url)
                .then((response) => {
                    this.items = response.data;
                    this.isBusy = false;
                })
                .catch((error) => {
                    console.log(error);
                    this.isBusy = false;
                });
        },

        deleteProduct(id) {
            Swal.fire({
                title: 'Delete item',
                text: 'Do you wish to delete this item?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            })
            .then((result) => {
                if (result.value) {
                    const url = `/api/products/${id}`;
                    const param = this.product;

                    axios.delete(url, param)
                        .then((response) => {
                            Swal.fire('Deleted!', 'Product successfully deleted.', 'success');
                            this.fetchProducts();
                        })
                        .catch((error) => {
                            Swal.fire('Error!', 'The operation could not be completed.', 'error');
                            console.log(error);
                        });
                }
            });

            event.preventDefault();
        }
    }
}
</script>