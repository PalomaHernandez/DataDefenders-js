<template>
	<Layout>
		<template #title>Log in</template>
		<template #status></template>
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
		</form>
	</Layout>
</template>

<script lang="ts">
import {ref} from 'vue'
import router from '@/router'
import Layout from '@/Layout.vue'
import {useLoginStore} from '@/stores/login'
import LabeledObject from '@/components/LabeledObject.vue'

export default {
	name: "Home",
	components: {
		Layout,
		LabeledObject
	},
	computed: {
		isAuthenticated():boolean {
			return this.loginStore.authenticated
		}
	},
	setup(){
		const loginStore = useLoginStore()
		const credentials = ref({
			email: '',
			password: '',
		})
		return {
			loginStore,
			credentials
		}
	},
	methods: {
		login():void {
			if(this.$refs && this.$refs.form){
				const form = this.$refs.form as HTMLFormElement
				if(!form.checkValidity()){
					form.reportValidity()
				} else {
					this.loginStore.login(this.credentials)
				}
			} else {
				alert('Oops, something went wrong! Please try again later.')
			}
		}
	},
	mounted(){
		if(this.isAuthenticated){
			router.push({name: 'login'})
		}
	}
}
</script>