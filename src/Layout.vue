<template>
	<header class="flex gap-4 px-3 py-2 border-b shadow z-10">
		<div class="flex-grow font-semibold">
			<slot name="title"/>
		</div>
		<div class="fixed lg:relative left-0 bottom-14 lg:left-auto lg:bottom-auto m-5 lg:m-0 z-20 w-full lg:w-auto">
			<div class="relative w-full lg:w-auto">
				<div class="absolute lg:relative w-full lg:w-auto">
					<slot name="status"/>
				</div>
			</div>
		</div>
		<slot name="tools"/>
	</header>
	<main class="flex-grow flex flex-col overflow-y-auto bg-gray-50">
		<slot/>
	</main>
	<footer class="bg-sky-900">
		<nav class="main-nav flex">
			<RouterLink :to="{name: 'search'}">
				<i class="fa-solid fa-search"></i>
			</RouterLink>
			<RouterLink :to="{name: 'offers'}">
				<i class="fa-solid fa-file-edit"></i>
			</RouterLink>
			<RouterLink :to="{name: 'home'}" class="!p-1">
				<div class="rounded-full h-12 w-12 flex justify-center items-center bg-sky-100 border">
					<img alt="UniManager logo" class="h-8" src="@/assets/logos/um.svg">
				</div>
			</RouterLink>
			<RouterLink :to="{name: 'account'}">
				<i class="fa-solid fa-user-circle"></i>
			</RouterLink>
			<a v-if="isAuthenticated" href="#" @click.prevent="logout">
				<i class="fa-solid fa-sign-out"></i>
			</a>
			<RouterLink v-else :to="{name: 'login'}">
				<i class="fa-solid fa-sign-in"></i>
			</RouterLink>
		</nav>
	</footer>
</template>

<script lang="ts">
import router from '@/router'
import {RouterLink} from 'vue-router'
import {useAuthStore} from '@/stores/auth'

export default {
	name: "Layout",
	components: {
		RouterLink
	},
	computed: {
		isAuthenticated():boolean {
			return this.authStore.authenticated
		},
		isNotAuthenticated():boolean {
			return !this.isAuthenticated
		}
	},
	setup(){
		const authStore = useAuthStore()
		return {
			authStore,
		}
	},
	methods: {
		logout():void {
			this.authStore.logout()
		}
	},
	mounted():void {
		if(this.isNotAuthenticated && router.currentRoute.value.name !== 'login' && router.currentRoute.value.name !== 'register'){
			this.authStore.logout()
		}
	}
}
</script>