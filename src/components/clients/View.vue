<template>
    <div class="customer-view" v-if="client">
        <div class="user-img">
            <img src="https://www.scottsdaleazestateplanning.com/wp-content/uploads/2018/01/user.png" alt="">
        </div>
        <div class="user-info">
            <table class="table">
                <tr>
                    <th>ID</th>
                    <th>{{ client.id }}</th>
                </tr>
                <tr>
                    <th>Name</th>
                    <th>{{ client.first_name }}</th>
                </tr>
                <tr>
                    <th>Email</th>
                    <th>{{ client.email }}</th>
                </tr>
                <tr>
                    <th>Contacts:</th>
                    <th v-if="!client.contacts.length">none</th>
                    <th v-else></th>
                </tr>
            </table>
            <div class="text-center">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter0">
                    Add New address <i class="far fa-plus-square"></i>
                </button>
                <!-- Modal -->
                <div class="modal fade" id="exampleModalCenter0" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle0" aria-hidden="true" >
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalCenterTitle0">Add New Contact</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="addNewContact(client.id)" data-vv-scope="formCreateContact">
                                    <div class="form-group text-left">
                                        <label for="postcode" class="col-form-label">PostCode:</label>
                                        <input type="text"
                                               class="form-control"
                                               id="postcode"
                                               v-model="new_contact.postcode"
                                               name="PostCode"
                                               v-validate="'required|min: 4|max: 20|alpha_dash'"
                                               placeholder="Enter PostCode"
                                        >
                                    </div>
                                    <div class="form-group text-left">
                                        <label for="address" class="col-form-label">Address:</label>
                                        <input type="text"
                                               class="form-control"
                                               id="address"
                                               v-model="new_contact.address"
                                               required
                                               placeholder="Enter address"
                                               v-validate="'required|min: 5|max: 26'"
                                               name="address"
                                        >
                                    </div>
                                    <ul class="text-left text-danger">
                                        <li v-for="error in errors.all()">{{ error }}</li>
                                    </ul>
                                    <div class="errors" v-if="errorsFormServer">
                                        <p v-for="(error, key, index) in errorsFormServer">
                                            {{ error[0] }}
                                        </p>
                                    </div>
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
            <br>
            <table class="table table-sm table-bordered table-hover" v-if="client.contacts.length">
                <thead>
                    <th>#</th>
                    <th>Postcode</th>
                    <th>Address</th>
                    <th>Act</th>
                </thead>
                <tbody>
                <tr v-for="(contact, key, index) in client.contacts" >
                    <td>{{key+1}}</td>
                    <td>{{contact.postcode}}</td>
                    <td>{{contact.address}}</td>
                    <td>
                        <button type="button" class="butt" data-toggle="modal" :data-target="'#exampleModalCenter7' + contact.id" @click="showEditContact(contact)">
                            <i class="far fa-edit"></i>
                        </button>
                        <!-- Modal -->
                        <div class="modal fade" :id="'exampleModalCenter7' + contact.id" tabindex="-1" role="dialog" :aria-labelledby="'exampleModalCenterTitle7' + contact.id" aria-hidden="true" >
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" :id="'exampleModalCenterTitle7' + contact.id">Editing Contact</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <form @submit.prevent="editContact(client.id, contact.id)">
                                            <div class="form-group text-left">
                                                <label :for="'postcode' + contact.id" class="col-form-label">PostCode:</label>
                                                <input type="text"
                                                       class="form-control"
                                                       :id="'postcode' + contact.id"
                                                       v-model="edit_contact.postcode"
                                                       name="PostCode"
                                                       required
                                                >
                                            </div>
                                            <div class="form-group text-left">
                                                <label :for="'address' + contact.id" class="col-form-label">Address:</label>
                                                <input type="text"
                                                       class="form-control"
                                                       :id="'address' + contact.id"
                                                       v-model="edit_contact.address"
                                                       required
                                                       placeholder="Enter address"
                                                       name="address"
                                                >
                                            </div>
                                            <div class="errors" v-if="errorsFormServer">
                                                <p v-for="(error, key, index) in errorsFormServer">
                                                    {{ error[0] }}
                                                </p>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="submit" class="btn btn-primary">Update</button>

                                            </div>

                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>


                        <button class="butt" @click="deleteContact(contact.id)">
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
            <router-link to="/clients">Back to all Clients</router-link>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {config} from "../../helpers/config"

    export default {
        name: "Customer",
        created(){
            this.getClientInfo();
        },
        data() {
            return {
                client: null,
                new_contact: {
                    client_id: null,
                    address: null,
                    postcode: null
                },
                edit_contact: {
                    client_id: null,
                    address: null,
                    postcode: null
                },
                errorsFormServer: []
            }
        },

        methods:
        {
            showEditContact(contact)
            {
                this.edit_contact.address = contact.address;
                this.edit_contact.postcode= contact.postcode;
            },

            editContact(client_id, contact_id)
            {
                this.edit_contact.client_id = client_id;
                axios.put(config.apiUrl + '/contacts/' + contact_id, this.edit_contact, {
                    headers: {
                        "Authorization": `Bearer ${ this.$store.getters.currentUser.token }`
                    }
                })
                    .then((response) => {
                        this.getClientInfo();
                        $('#exampleModalCenter7' + contact_id).modal('hide');
                        this.edit_contact.client_id=null;
                        this.edit_contact.postcode=null;
                        this.edit_contact.address=null;
                    })
                    .catch((err) => {
                        this.errorsFormServer = err.response.data.errors;
                        // console.log(this.errorsFormServer);
                        // reject("Something Wrong ...");
                    })

            },

            addNewContact(client_id)
            {
                this.$validator.validate().then(result => {
                    if (!result) {
                        // do stuff if not valid.
                        console.log('validation errors...')
                    }
                    else {
                        this.new_contact.client_id = client_id;
                        axios.post(config.apiUrl + '/contacts', this.new_contact, {
                            headers: {
                                "Authorization": `Bearer ${ this.$store.getters.currentUser.token }`
                            }
                        })
                            .then((response) => {
                                this.getClientInfo();
                                $('#exampleModalCenter0').modal('hide');
                                this.new_contact.client_id=null;
                                this.new_contact.postcode=null;
                                this.new_contact.address=null;
                            })
                            .catch((err) => {
                                this.errorsFormServer = err.response.data.errors;
                                // reject("Something Wrong ...");
                            })
                    }
                });
            },

            deleteContact(contact_id)
            {
                axios.delete(config.apiUrl + '/contacts/' + contact_id, {
                    headers: {
                        "Authorization": `Bearer ${ this.$store.getters.currentUser.token }`
                    }
                })
                    .then((response) => {
                        this.getClientInfo();
                    })
                    .catch((err) => {
                        reject("Something Wrong ...");
                    })
            },

            getClientInfo(){
                axios.get(config.apiUrl + `/clients/${this.$route.params.id}`, {
                    headers: {
                        "Authorization": `Bearer ${ this.$store.getters.currentUser.token }`
                    }
                })
                    .then((response) => {
                        // console.log(response.data);
                        this.client = response.data.client;
                    })
                    .catch((err) => {
                        reject("Wrong something");
                    })
            }
        }
    }
</script>

<style scoped>
    .errors{
        /*background: lightcoral;*/
        color: orangered;
        border-radius: 5px;
        /*padding: 21px 0 2px 0;*/
    }

    .butt{
        cursor: pointer;
    }
    .customer-view{
        display: flex;
        align-items: center;
    }
    .user-img{
        flex: 1;
    }
    .user-img img {
        max-width: 160px;
    }
    .user-info {
        flex: 3;
        /*overflow-x: scroll;*/
    }
</style>
