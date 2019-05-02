<template>
    <b-container>
        <b-row>
            <h1>Order List</h1>
        </b-row>

        <b-row>
            <b-button variant="primary" style="color: #ffffff; margin: 20px;"><a href="Orders/create" style="color: #ffffff;">Create New Order</a></b-button>
        </b-row>

        <b-row>
            <b-table striped hover :items="items" :fields="fields" :busy="isBusy">
                <div slot="table-busy" class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                </div>

                <template slot="actions" slot-scope="data">
                    <b-button variant="warning" v-bind:href="'Orders/' + data.item._id">Update</b-button>
                    <b-button variant="danger" v-on:click="deleteOrder(data.item._id)">Delete</b-button>
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
                    key: 'delivery_address',
                    sortable: false
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
        this.fetchOrders();
    },

    methods: {
        fetchOrders() {
            const url = '/api/orders/';
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

        deleteOrder(id) {
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
                    const url = `/api/orders/${id}`;
                    const param = this.Order;

                    axios.delete(url, param)
                        .then((response) => {
                            Swal.fire('Deleted!', 'Order successfully deleted.', 'success');
                            this.fetchOrders();
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