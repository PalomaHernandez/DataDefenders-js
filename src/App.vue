<template>
	<main class="flex">
		<aside class="h-screen w-fit flex flex-col bg-sky-900">
			<div class="flex justify-center p-4">
				<img alt="Vue logo" class="h-12" src="@/assets/logos/um-white.svg">
			</div>
			<nav class="main-nav flex-grow overflow-y-auto">
				<RouterLink :to="{name: 'home'}">
					<i class="fa-solid fa-home"></i>
				</RouterLink>
				<RouterLink :to="{name: 'home'}">
					<i class="fa-solid fa-search"></i>
				</RouterLink>
				<RouterLink :to="{name: 'home'}">
					<i class="fa-solid fa-file-edit"></i>
				</RouterLink>
				<RouterLink :to="{name: 'home'}">
					<i class="fa-solid fa-user-circle"></i>
				</RouterLink>
			</nav>
		</aside>
		<section class="flex-grow flex flex-col">
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
			<section class="flex-grow overflow-y-auto bg-gray-50">
				<RouterView/>
			</section>
		</section>
	</main>
</template>

<script lang="ts">
import {RouterLink, RouterView} from 'vue-router'

export default {
	name: "App",
	components: {
		RouterLink,
		RouterView
	}
}
</script>