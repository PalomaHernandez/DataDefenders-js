<template>
	<Layout>
		<template #title>Applications</template>
		<template #status></template>
		<template #tools>
			All
			<button type="button" class="tool tool-primary" @click="applicationStore.load">
				<i class="fa-solid fa-spinner animate-spin" v-if="loading"></i>
				<i class="fa-solid fa-sync" v-else></i>
			</button>
		</template>
		<Loading v-if="loading"/>
		<div v-else class="flex flex-col divide-y">
			<RouterLink v-for="application in applications" :to="{name: 'applications.show', params: {id: application.id}}" class="px-3 py-2 flex justify-between items-center gap-2 hover:bg-gray-100">
				<div class="flex flex-col items-start gap-2">
					<p class="font-bold">{{ application.offer.title }}</p>
					<div v-if="application.is_job" class="flex items-center gap-2 text-gray-400">
						<i class="fa-solid fa-file-contract"></i>
						<p>Job Application</p>
					</div>
					<div v-else-if="application.is_scholarship" class="flex items-center gap-2 text-gray-400">
						<i class="fa-solid fa-file-signature"></i>
						<p>Scholarship Application</p>
					</div>
					<StatusIndicator :status="application.status"/>
				</div>
				<i class="fa-solid fa-chevron-right text-gray-400"></i>
			</RouterLink>
		</div>
	</Layout>
</template>

<script lang="ts">
import Layout from '@/Layout.vue'
import {RouterLink} from 'vue-router'
import Loading from '@/components/Loading.vue'
import {useApplicationStore} from '@/stores/applications'
import StatusIndicator from '@/components/StatusIndicator.vue'

export default {
	name: "Index",
	components: {
		StatusIndicator,
		RouterLink,
		Loading,
		Layout,
	},
	computed: {
		loading(){
			return this.applicationStore.loading
		},
		applications(){
			return this.applicationStore.applications
		}
	},
	setup(){
		const applicationStore = useApplicationStore()
		return {
			applicationStore
		}
	},
	created(){
		if(this.applications.length === 0){
			this.applicationStore.load()
		}
	}
}
</script>