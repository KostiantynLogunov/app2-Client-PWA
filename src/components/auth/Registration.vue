<template>
	<div class="login row justify-content-center">
		<div class="co-md-4">
			<div class="card">
				<div class="card-header">Registration</div>
				<div class="card-body">
					<form @submit.prevent="registration()">
						<div class="form-group row">
							<label for="name">Name:</label>
							<input type="text"
								   name="name"
								   v-model="form.name"
								   class="form-control"
								   placeholder="Enter your name"
								   id="name"
								   required
							>
						</div>

						<div class="form-group row">
							<label for="email">Email:</label>
							<input type="email"
								   name="email"
								   v-model="form.email"
								   class="form-control"
								   placeholder="Enter you Email"
								   id="email"
								   required
							>
						</div>
						<div class="form-group row">
							<label for="password">Password:</label>
							<input type="password"
								   name="password"
								   v-model="form.password"
								   class="form-control"
								   placeholder="Enter a password"
								   id="password"
								   required
								   ref="password"
							>
						</div>
						<div class="form-group row">
							<label for="password_confirmation">Confirm Password:</label>
							<input type="password"
								   name="password_confirmation"
								   v-model="form.password_confirmation"
								   class="form-control"
								   placeholder="Password, Again"
								   id="password_confirmation"
								   data-vv-as="password"
								   required
							>
						</div>
						<div class="form-group row">
							<input type="submit" class="btn btn-primary" value="Register" :disabled="errors.items.length > 0">
						</div>
						<ul class="text-left text-danger">
							<li v-for="error in errors.all()">{{ error }}</li>
						</ul>
						<div class="errors text-center" v-if="errorsFormServer">
							<p v-for="(error, key, index) in errorsFormServer">
								{{ error[0] }}
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import {config} from '../../helpers/config'


    export default {
        name: "Registration",

	    data() {
        	return {
                form: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                },
                errorsFormServer: null,
	        }
	    },


	     methods: {
             registration()
		     {
                 this.$validator.validate().then(result => {
                     if (!result) {
                         // do stuff if not valid.
                         console.log('validation errors...')
                     }
                     else {
                         this.serverErrors = null;
                         // send to api
                         axios.post(config.apiUrl + '/auth/register', this.form)
                             .then((response) => {
                                 this.$store.dispatch('login');
                                 this.$store.commit("loginSuccess", response.data);
                                 this.clearForm();

								 this.$router.push({path: '/'});
                             })
                             .catch((err) => {
                                 this.errorsFormServer = err.response.data.errors;
                                 console.log(this.errorsFormServer);
                             })
                     }
                 });

		     },

		     htmlEntities(str) {
			     return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g,'&apos');
		     },

		     clearForm(){
			     this.form.name = null;
			     this.form.email = null;
			     this.form.password = null;
			     this.form.confirm_password= null;
		     }
	     }
    }
</script>

<style scoped>
	.errors{
		color: orangered;
		padding: 21px 0 2px 0;
	}
</style>
