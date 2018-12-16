<template>
    <div>
        <div class="btn-wrapper">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                Add New
            </button>
            <!-- Modal -->
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" ref="myModalRef">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">Add New Client</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="addNewClient()">
                                <div class="form-group text-left">
                                    <label for="recipient_name" class="col-form-label">Name:</label>
                                    <input type="text"
                                           class="form-control"
                                           id="recipient_name"
                                           v-model="new_client.first_name"
                                           name="Name"
                                           v-validate="'required|min: 3|max: 26|alpha_num'"
                                           placeholder="Enter first name"
                                    >
                                </div>
                                <div class="form-group text-left">
                                    <label for="recipient_email" class="col-form-label">Email:</label>
                                    <input type="email"
                                           class="form-control"
                                           id="recipient_email"
                                           v-model="new_client.email"
                                           required
                                           placeholder="Enter your email address"
                                           v-validate="'required|email|min: 5|max: 26'"
                                           name="Email"
                                    >
                                </div>
                                <ul class="text-left text-danger">
                                    <li v-for="error in errors.all()">{{ error }}</li>
                                </ul>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary" :disabled="errors.items.length > 0">Add</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <table class="table text-center">
            <thead>
                <th>Name</th>
                <th>Email</th>
                <th>Contacts</th>
                <th>Actions</th>
            </thead>
            <tbody>
                <template v-if="!clients.length">
                    <tr>
                        <td colspan="4" class="text-center">No customers Available</td>
                    </tr>
                </template>
                <template v-else>
                    <tr v-for="client in clients" :key="client.id">
                        <td>
                            <router-link :to="`/clients/${client.id}`">{{ client.first_name }}</router-link>
                        </td>
                        <td>
                            <router-link :to="`/clients/${client.id}`">{{ client.email }}</router-link>
                            <div class="tab" v-if="client_contacts == client.id">
                                <tr>
                                    <th>PostCode</th>
                                    <th>Address</th>
                                </tr>
                                <tr v-for="(contact, key, index) in client.contacts" >
                                    <td>{{contact.postcode}}</td>
                                    <td>{{contact.address}}</td>
                                </tr>
                            </div>
                        </td>
                        <td class="text-center">
                            <div v-if="client.contacts.length"
                                 class="text-success"
                            >
                                <button class="btn btn-outline-primary"
                                        @click="showContacts(client.id)"
                                >
                                    Show {{ client.contacts.length }}
                                </button>
                            </div>
                            <div v-else>-</div>
                        </td>
                        <td>
                            <!--<router-link :to="`/clients/${client.id}`">View</router-link>-->
                            <!--<button class="btn btn-warning"><i class="far fa-edit"></i></button>-->
                            <button type="button" class="btn btn-warning" data-toggle="modal" :data-target="'#exampleModalCenter2' + client.id" @click="editClient(client)">
                                <i class="far fa-edit"></i>
                            </button>
                            <!-- Modal -->
                            <div class="modal fade" :id="'exampleModalCenter2' + client.id" tabindex="-1" role="dialog" :aria-labelledby="'exampleModalCenterTitle2' + client.id" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" :id="'exampleModalCenterTitle2' + client.id">Editing Client</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <form @submit.prevent="UpdateClient()">
                                                <div class="form-group text-left">
                                                    <label :for="'client_name' + client.id"
                                                           class="col-form-label"
                                                    >
                                                        Name:
                                                    </label>
                                                    <input type="text"
                                                           class="form-control"
                                                           :id="'client_name' + client.id"
                                                           v-model="edit_client.first_name"
                                                           name="Name"
                                                    >
                                                </div>
                                                <div class="form-group text-left">
                                                    <label :for="'client_email' + client.id"
                                                           class="col-form-label"
                                                    >
                                                        Email:
                                                    </label>
                                                    <input type="email"
                                                           class="form-control"
                                                           :id="'client_email' + client.id"
                                                           v-model="edit_client.email"
                                                           required
                                                           name="email"
                                                           required
                                                    >
                                                </div>
                                                <ul class="text-left text-danger">
                                                    <li v-for="error in errors.all()">{{ error }}</li>
                                                </ul>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    <button type="submit" class="btn btn-primary" :disabled="errors.items.length > 0">Update</button>
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </div>
                            </div>


                            <button class="btn btn-danger" @click="DeleteClient(client.id)"><i class="far fa-trash-alt"></i></button>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {config} from '../../helpers/config';
    import axios from "axios/index";

    export default {
        name: "CustomersList",
        data(){
            return {
                new_client: {
                    first_name: null,
                    email: null
                },
                edit_client: {
                    id: null,
                    first_name: null,
                    email: null
                },
                client_contacts: false,
            }
        },
        computed: {
            clients() {
                return  this.$store.getters.clients;
            }
        },
        mounted() {
            this.$store.dispatch('getClients');
        },

        methods:
        {
            UpdateClient()
            {
                axios.put(config.apiUrl + '/clients/' + this.edit_client.id, this.edit_client, {
                    headers: {
                        "Authorization": `Bearer ${ this.$store.getters.currentUser.token }`
                    }
                })
                    .then((response) => {
                        this.$store.dispatch('getClients');
                        $('#exampleModalCenter2' + this.edit_client.id).modal('hide');
                        this.edit_client.id = null;
                        this.edit_client.first_name = null;
                        this.edit_client.email = null;
                    })
                    .catch((err) => {
                        reject("Something Wrong ...");
                    })
            },

            editClient(client)
            {
                this.edit_client.id = client.id;
                this.edit_client.first_name = client.first_name;
                this.edit_client.email = client.email;
            },

            showContacts(clent_id){
                if (this.client_contacts == clent_id)
                    this.client_contacts = false;
                else
                    this.client_contacts = clent_id;
            },

            DeleteClient(client_id){
                axios.delete(config.apiUrl + '/clients/' + client_id, {
                    headers: {
                        "Authorization": `Bearer ${ this.$store.getters.currentUser.token }`
                    }
                })
                    .then((response) => {
                        this.$store.dispatch('getClients');

                    })
                    .catch((err) => {
                        reject("Something Wrong ...");
                    })
            },

            addNewClient(){
                this.$validator.validate().then(result => {
                    if (!result) {
                        // do stuff if not valid.
                        console.log('validation errors...')
                    }
                    else{
                        axios.post(config.apiUrl + '/clients', this.new_client, {
                            headers: {
                                "Authorization": `Bearer ${ this.$store.getters.currentUser.token }`
                            }
                        })
                            .then((response) => {
                                this.$store.dispatch('getClients');
                                $('#exampleModalCenter').modal('hide');
                            })
                            .catch((err) => {
                                reject("Something Wrong ...");
                            })
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .btn-wrapper{
        text-align: right;
        margin-bottom: 20px;
    }
</style>
