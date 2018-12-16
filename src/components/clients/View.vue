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
                <button class="butt">Add New address <i class="far fa-plus-square"></i></button>
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
                        <button class="butt">
                            <i class="far fa-edit"></i>
                        </button>
                        <button class="butt">
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
            axios.get(config.apiUrl + `/clients/${this.$route.params.id}`, {
                headers: {
                    "Authorization": `Bearer ${ this.$store.getters.currentUser.token }`
                }
            })
                .then((response) => {
                    this.client = response.data.user;
                })
                .catch((err) => {
                    reject("Wrong something");
                })
        },
        data() {
            return {
                client: null
            }
        }
    }
</script>

<style scoped>
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
