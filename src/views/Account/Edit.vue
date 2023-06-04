<template>
	<Layout>
		<template #title>
			<RouterLink :to="{name: 'account'}" class="tool tool-primary">
				<i class="fa-solid fa-chevron-left"></i>
				My account
			</RouterLink>
		</template>
		<template #status></template>
		<template #tools>
			<button type="submit" class="btn btn-primary" @click="update">
				<i class="fa-solid fa-check"></i> Save changes
			</button>
		</template>
		<form v-if="currentAccount" class="flex flex-col items-stretch gap-3 p-4" ref="form" @submit.prevent="update">
			<p class="font-bold text-lg">Edit profile</p>
			<div class="flex flex-col md:flex-row md:items-center gap-3">
				<LabeledObject required>
					<template #label>First name</template>
					<input type="text" id="first_name" name="first_name" v-model="currentAccount.first_name" required>
				</LabeledObject>
				<LabeledObject>
					<template #label>Middle name</template>
					<input type="text" id="middle_name" name="middle_name" v-model="currentAccount.middle_name">
				</LabeledObject>
				<LabeledObject required>
					<template #label>Last name</template>
					<input type="text" id="last_name" name="last_name" v-model="currentAccount.last_name" required>
				</LabeledObject>
			</div>
			<div class="flex flex-col md:flex-row md:items-center gap-3">
				<LabeledObject>
					<template #label>E-mail address</template>
					<p class="fake-disabled">{{ currentAccount.email }}</p>
				</LabeledObject>
			</div>
			<div class="flex flex-col md:flex-row md:items-center gap-3">
				<LabeledObject required>
					<template #label>ID</template>
					<input type="text" id="id_card" name="id_card" v-model="currentAccount.id_card" required>
				</LabeledObject>
				<LabeledObject required>
					<template #label>Phone</template>
					<input type="tel" id="phone" name="phone" v-model="currentAccount.phone" required>
				</LabeledObject>
			</div>
			<div class="flex flex-col md:flex-row md:items-center gap-3">
				<LabeledObject required>
					<template #label>Address line 1</template>
					<input type="text" id="address_line_1" name="address_line_1" v-model="currentAccount.address_line_1" required>
				</LabeledObject>
				<LabeledObject>
					<template #label>Address line 2</template>
					<input type="text" id="address_line_2" name="address_line_2" v-model="currentAccount.address_line_2">
				</LabeledObject>
			</div>
			<div class="flex flex-col md:flex-row md:items-center gap-3">
				<LabeledObject required>
					<template #label>City</template>
					<input type="text" id="city" name="city" v-model="currentAccount.city" required>
				</LabeledObject>
				<LabeledObject required>
					<template #label>Region</template>
					<input type="text" id="region" name="region" v-model="currentAccount.region" required>
				</LabeledObject>
				<LabeledObject required>
					<template #label>Country</template>
					<input type="text" id="country" name="country" v-model="currentAccount.country" required>
				</LabeledObject>
			</div>
			<LabeledObject required>
				<template #label>Postal code</template>
				<input type="text" id="postal_code" name="postal_code" v-model="currentAccount.postal_code" required>
			</LabeledObject>
		</form>
	</Layout>
</template>

<script lang="ts">
import Layout from '@/Layout.vue'
import {useAuthStore} from '@/stores/auth'
import type Account from '@/types/Account'
import LabeledObject from '@/components/LabeledObject.vue'

export default {
	name: "Edit",
	components: {
		Layout,
		LabeledObject
	},
	computed: {
		isAuthenticated(): boolean{
			return this.authStore.authenticated
		},
		currentAccount(): Account | null{
			return this.authStore.currentAccount
		}
	},
	setup(){
		const authStore = useAuthStore()
		return {
			authStore,
		}
	},
	methods: {
		update(): void{
			if(this.$refs && this.$refs.form){
				const form = this.$refs.form as HTMLFormElement
				if(!form.checkValidity()){
					form.reportValidity()
				} else {
					this.authStore.updateAccount()
				}
			} else {
				alert('Oops, something went wrong! Please try again later.')
			}
		}
	}
}
</script>
