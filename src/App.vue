<template>
	<main class="flex">
		<aside class="h-screen w-fit flex flex-col bg-sky-700">
			<div class="flex justify-center p-4">
				<img alt="Vue logo" class="h-12" src="@/assets/logos/um-white.svg">
			</div>
			<nav class="main-nav flex-grow overflow-y-auto">
				<RouterLink :to="{name: 'home'}">
					<i class="fa-solid fa-home"></i>
				</RouterLink>
			</nav>
		</aside>
		<section class="flex-grow flex flex-col">
			<header class="flex gap-4 px-3 py-2 border-b shadow z-10">
				<div class="flex-grow">
					<slot name="title"/>
				</div>
				<slot name="status"/>
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