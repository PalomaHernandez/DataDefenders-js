<template>
	<Layout>
		<template #title>Register</template>
		<template #status>
			<div v-if="success" class="alert alert-success" @click="authStore.clearMessages()">{{ success }}</div>
			<div v-if="error" class="alert alert-danger" @click="authStore.clearMessages()">{{ error }}</div>
			<div v-if="info" class="alert alert-info" @click="authStore.clearMessages()">{{ info }}</div>
		</template>
		<template #tools></template>
		<form class="flex flex-col items-stretch gap-3 p-4" ref="form" @submit.prevent="register">
			<div class="flex flex-col md:flex-row md:items-center gap-3">
				<LabeledObject required>
					<template #label>First name</template>
					<input type="text" id="first_name" name="first_name" v-model="account.first_name" required>
				</LabeledObject>
				<LabeledObject>
					<template #label>Middle name</template>
					<input type="text" id="middle_name" name="middle_name" v-model="account.middle_name">
				</LabeledObject>
				<LabeledObject required>
					<template #label>Last name</template>
					<input type="text" id="last_name" name="last_name" v-model="account.last_name" required>
				</LabeledObject>
			</div>
			<div class="flex flex-col md:flex-row md:items-center gap-3">
				<LabeledObject required>
					<template #label>ID</template>
					<input type="text" id="id_card" name="id_card" v-model="account.id_card" required>
				</LabeledObject>
				<LabeledObject required>
					<template #label>Phone</template>
					<input type="tel" id="phone" name="phone" v-model="account.phone" required>
				</LabeledObject>
			</div>
			<div class="flex flex-col md:flex-row md:items-center gap-3">
				<LabeledObject required>
					<template #label>Address line 1</template>
					<input type="text" id="address_line_1" name="address_line_1" v-model="account.address_line_1" required>
				</LabeledObject>
				<LabeledObject>
					<template #label>Address line 2</template>
					<input type="text" id="address_line_2" name="address_line_2" v-model="account.address_line_2">
				</LabeledObject>
			</div>
			<div class="flex flex-col md:flex-row md:items-center gap-3">
				<LabeledObject required>
					<template #label>City</template>
					<input type="text" id="city" name="city" v-model="account.city" required>
				</LabeledObject>
				<LabeledObject required>
					<template #label>Region</template>
					<input type="text" id="region" name="region" v-model="account.region" required>
				</LabeledObject>
				<LabeledObject required>
					<template #label>Country</template>
					<input type="text" id="country" name="country" v-model="account.country" required>
				</LabeledObject>
			</div>
			<div class="flex flex-col md:flex-row md:items-center gap-3">
				<LabeledObject required>
					<template #label>E-mail address</template>
					<input type="email" id="email" name="email" v-model="account.email" required>
				</LabeledObject>
				<LabeledObject required>
					<template #label>Password</template>
					<input type="password" id="password" name="password" v-model="account.password" required>
				</LabeledObject>
				<LabeledObject required>
					<template #label>Password</template>
					<input type="password" id="password_confirmation" name="password_confirmation" v-model="account.password_confirmation" required>
				</LabeledObject>
			</div>
			<LabeledObject required>
				<template #label>Postal code</template>
				<input type="text" id="postal_code" name="postal_code" v-model="account.postal_code" required>
			</LabeledObject>
			<button type="submit" class="btn btn-primary" @click="register">
				<i class="fa-solid fa-spinner animate-spin" v-if="registering"></i>
				<i class="fa-solid fa-check" v-else></i>
				Create account
			</button>
		</form>
	</Layout>
</template>

<script lang="ts">
import router from '@/router'
import Layout from '@/Layout.vue'
import {useAuthStore} from '@/stores/auth'
import {type Ref, ref, type UnwrapRef} from 'vue'
import {type AccountConfirmed} from '@/types/Account'
import LabeledObject from '@/components/LabeledObject.vue'

export default {
	name: "Register",
	components: {
		LabeledObject,
		Layout
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
		},
		registering():boolean {
			return this.authStore.registering
		}
	},
	setup(){
		const authStore = useAuthStore()
		const account: Ref<UnwrapRef<AccountConfirmed>> = ref({
			id: 0,
			first_name: '',
			middle_name: null,
			last_name: '',
			email: '',
			password: '',
			password_confirmation: '',
			phone: '',
			address_line_1: '',
			address_line_2: null,
			city: '',
			region: '',
			country: '',
			postal_code: '',
			id_card: '',
			created_at: '',
			updated_at: '',
		})
		return {
			authStore,
			account,
		}
	},
	methods: {
		register():void {
			if(this.$refs && this.$refs.form){
				const form = this.$refs.form as HTMLFormElement
				if(!form.checkValidity()){
					form.reportValidity()
				} else {
					this.authStore.register(this.account)
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
