import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Registration'
import ClientsMain from './components/clients/Main'
import ClientsList from './components/clients/List'
import Client from './components/clients/View'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/clients',
        component: ClientsMain,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '/',
                component: ClientsList
            },
            {
                path: ':id',
                component: Client
            }
        ]
    },
];

export const router = new VueRouter({
    routes,
    mode: 'history'
});
