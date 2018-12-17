<template>
    <div class="login row justify-content-center">
        <div class="co-md-4">
            <div class="card">
                <div class="card-header">Login</div>
                <div class="card-body">
                    <form @submit.prevent="authenticate">
                        <div class="form-group row">
                            <label for="email">Email:</label>
                            <input type="email"
                                   name="email"
                                   v-model="form.email"
                                   class="form-control"
                                   placeholder="Email address"
                                   id="email"
                                   v-validate="'required|email|min: 5|max: 26'"
                                   required
                            >
                        </div>
                        <div class="form-group row">
                            <label for="password">Password:</label>
                            <input type="password"
                                   name="password"
                                   v-model="form.password"
                                   class="form-control"
                                   placeholder="Password"
                                   id="password"
                                   v-validate="'required|alpha_num|min: 5|max: 26'"
                                   required
                            >
                        </div>
                        <div class="form-group row">
                            <input type="submit" class="btn btn-success" value="Login" :disabled="errors.items.length > 0">
                        </div>
                        <ul class="text-left text-danger">
                            <li v-for="error in errors.all()">{{ error }}</li>
                        </ul>
                        <div class="form-group row" v-if="authError">
                            <p class="error">
                                {{ authError }}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {login} from '../../helpers/auth';

    export default {
        name: "Login",
        data() {
            return {
                form: {
                    email: '',
                    password: ''
                },
            };
        },
        methods: {
            authenticate() {
                this.$validator.validate().then(result => {
                    if (!result) {
                        // do stuff if not valid.
                        console.log('validation errors...')
                    }
                    else {
                        this.$store.dispatch('login');

                        login(this.$data.form)
                            .then((res) => {
                                this.$store.commit("loginSuccess", res);
                                this.$router.push({path: '/'});
                            })
                            .catch((error) => {
                                this.$store.commit("loginFailed", {error});
                            });
                    }
                })
            }
        },
        computed: {
            authError() {
                return this.$store.getters.auth_error;
            }
        }
    }
</script>

<style scoped>
.error{
    color: red;
}
</style>
