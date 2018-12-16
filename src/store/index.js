import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import { getLocalUser} from "../helpers/auth";
import axios from "axios/index";
import {config} from "../helpers/config";

const user = getLocalUser();

export const store = new Vuex.Store({
    state: {
        currentUser: user,
        isLoggedIn: !!user,
        loading: false,
        auth_error: null,
        clients: []
    },
    getters: {
        isLoading(state){
            return state.loading;
        },
        isLoggedIn(state){
            return state.isLoggedIn;
        },
        auth_error(state){
            return state.auth_error;
        },
        clients(state){
            return state.clients;
        },
        currentUser(state){
            return state.currentUser;
        }
    },
    mutations: {
        loginSuccess(state, payload) {
            state.auth_error = null;
            state.isLoggedIn = true;
            state.loading = false;
            state.currentUser = Object.assign({}, payload.user, {token: payload.access_token});

            localStorage.setItem("user", JSON.stringify(state.currentUser));
        },
        loginFailed(state, payload) {
            state.loading = false;
            state.auth_error = payload.error;
        },
        login(state) {
            state.loading = true;
            state.auth_error = null;
        },
        logout(state) {
            localStorage.removeItem("user");
            state.isLoggedIn = false;
            state.currentUser =null;
        },
        updateClients(state, payload) {
            state.clients = payload;
        }
    },
    actions: {
        login(store) {
            store.commit('login');
        },
        getClients(store) {
            axios.get(config.apiUrl + '/clients', {
                headers: {
                    "Authorization": `Bearer ${ store.state.currentUser.token }`
                }
            })
                .then((response) => {
                    store.commit('updateClients', response.data.data)
                })
                .catch((err) => {
                    reject("Wrong email or password");
                })
        }
    }
});
