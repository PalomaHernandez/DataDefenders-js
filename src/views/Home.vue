<template>
	<Layout>
		<template #title>Home</template>
		<template #status></template>
		<template #tools></template>
		<div class="flex flex-col items-center gap-5 p-6">
			<img src="@/assets/logos/um.svg" class="h-32" alt="UniManager logo">
			<p class="font-bold text-3xl text-gray-700 text-center">Welcome!</p>
			<p class="text-gray-400 text-center">Use our platform to browse the several offers we have available for you.</p>
			<p class="text-gray-400 text-center">Search, apply, and take the next step in your career!</p>
		</div>
	</Layout>
</template>

<script lang="ts">
import Layout from '@/Layout.vue'

export default {
	name: "Home",
	components: {Layout}
}
</script>