<template>
	<Layout>
		<template #title>Log in</template>
		<template #status>
			<div v-if="success" class="alert alert-success" @click="authStore.clearMessages()">{{ success }}</div>
			<div v-if="error" class="alert alert-danger" @click="authStore.clearMessages()">{{ error }}</div>
			<div v-if="info" class="alert alert-info" @click="authStore.clearMessages()">{{ info }}</div>
		</template>
		<template #tools></template>
		<form class="flex flex-col gap-3 p-4" ref="form" @submit.prevent="login">
			<LabeledObject>
				<template #label>E-mail address</template>
				<input type="email" v-model="credentials.email" required>
			</LabeledObject>
			<LabeledObject>
				<template #label>Password</template>
				<input type="password" v-model="credentials.password" required>
			</LabeledObject>
			<button type="submit" class="btn btn-primary">
				<i class="fa-solid fa-key"></i>
				Log in
			</button>
			<RouterLink :to="{name: 'register'}" class="font-medium text-sky-700">Don't have an account? Register here.</RouterLink>
		</form>
	</Layout>
</template>

<script lang="ts">
import {ref} from 'vue'
import router from '@/router'
import Layout from '@/Layout.vue'
import {RouterLink} from 'vue-router'
import {useAuthStore} from '@/stores/auth'
import LabeledObject from '@/components/LabeledObject.vue'

export default {
	name: "Home",
	components: {
		Layout,
		RouterLink,
		LabeledObject,
	},
	computed: {
		success(): string|null{
			return this.authStore.success
		},
		error(): string|null{
			return this.authStore.error
		},
		info(): string|null{
			return this.authStore.info
		},
		isAuthenticated():boolean {
			return this.authStore.authenticated
		}
	},
	setup(){
		const authStore = useAuthStore()
		const credentials = ref({
			email: '',
			password: '',
		})
		return {
			authStore,
			credentials,
		}
	},
	methods: {
		login():void {
			if(this.$refs && this.$refs.form){
				const form = this.$refs.form as HTMLFormElement
				if(!form.checkValidity()){
					form.reportValidity()
				} else {
					this.authStore.login(this.credentials)
				}
			} else {
				this.authStore.showError('Oops, something went wrong! Please try again later.')
			}
		}
	},
	mounted(){
		if(this.isAuthenticated){
			router.push({name: 'home'})
		}
	}
}
</script>