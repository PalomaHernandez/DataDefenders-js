<template>
	<Layout>
		<template #title>My account</template>
		<template #status></template>
		<template #tools>
			<RouterLink :to="{name: 'account.edit'}" class="btn btn-primary">
				<i class="fa-solid fa-user-edit"></i>
				Edit profile
			</RouterLink>
		</template>
		<div class="bg-sky-200">
			<div class="flex justify-center relative p-4">
				<div class="absolute mx-auto flex items-center justify-center text-8xl rounded-full h-48 w-48 bg-sky-700">
					<i class="fa-solid fa-user text-white"></i>
				</div>
			</div>
			<div class="bg-white shadow p-4 mt-28">
				<div v-if="currentAccount" class="mt-20 text-center flex flex-col gap-8">
					<div class="flex flex-col gap-3">
						<h1 class="text-4xl font-medium text-gray-700">{{ currentAccount.last_name }}, {{ currentAccount.first_name }} {{ currentAccount.middle_name }}</h1>
						<p class="font-light text-gray-600">{{ currentAccount.city }}, {{ currentAccount.region }}, {{ currentAccount.country }}</p>
					</div>
					<div class="flex flex-col items-center gap-2 text-gray-500">
						<div class="flex items-center gap-2">
							<i class="fa-solid fa-envelope text-sky-700"></i> {{ currentAccount.email }}
						</div>
						<div class="flex items-center gap-2">
							<i class="fa-solid fa-id-card text-sky-700"></i> {{ currentAccount.id_card }}
						</div>
						<div class="flex items-center gap-2">
							<i class="fa-solid fa-phone text-sky-700"></i> {{ currentAccount.phone }}
						</div>
						<div class="flex items-center gap-2">
							<i class="fa-solid fa-location-dot text-sky-700"></i> {{ currentAccount.address_line_1 }}
						</div>
						<div class="flex items-center gap-2" v-if="currentAccount.address_line_2">
							<i class="fa-solid fa-location-dot text-sky-700"></i> {{ currentAccount.address_line_2 }}
						</div>
						<div class="flex items-center gap-2">
							<i class="fa-solid fa-house-flag text-sky-700"></i> {{ currentAccount.postal_code }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</Layout>
</template>

<script lang="ts">
import Layout from '@/Layout.vue'
import {useAuthStore} from '@/stores/auth'
import type Account from '@/types/Account'
import LabeledObject from '@/components/LabeledObject.vue'

export default {
	name: "Show",
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
}
</script>