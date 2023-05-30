<template>
	<header class="flex gap-4 px-3 py-2 border-b shadow z-10">
		<div class="flex-grow">
			<slot name="title"/>
		</div>
		<div class="fixed lg:relative left-0 bottom-14 lg:left-auto lg:bottom-auto p-5 lg:p-0 z-20 w-full lg:w-auto">
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
			<RouterLink :to="{name: 'home'}" class="relative">
				<div class="absolute -bottom-4 rounded-full h-24 w-24 flex justify-center items-center bg-sky-100 border z-10">
					<img alt="UniManager logo" class="h-12" src="@/assets/logos/um.svg">
				</div>
			</RouterLink>
			<RouterLink :to="{name: 'account'}">
				<i class="fa-solid fa-user-circle"></i>
			</RouterLink>
			<RouterLink v-if="isAuthenticated" :to="{name: 'login'}">
				<i class="fa-solid fa-sign-in"></i>
			</RouterLink>
			<a v-else href="#" @click.prevent="logout">
				<i class="fa-solid fa-sign-out"></i>
			</a>
		</nav>
	</footer>
</template>

<script lang="ts">
import {RouterLink} from 'vue-router'
import {useLoginStore} from '@/stores/login'

export default {
	name: "Layout",
	components: {
		RouterLink
	},
	computed: {
		isAuthenticated():boolean {
			return this.loginStore.authenticated
		},
		isNotAuthenticated():boolean {
			return !this.isAuthenticated
		}
	},
	setup(){
		const loginStore = useLoginStore()
		return {
			loginStore
		}
	},
	methods: {
		logout():void {
			this.loginStore.logout()
		}
	},
	mounted():void {
		if(this.isNotAuthenticated){
			this.loginStore.logout()
		}
	}
}
</script>