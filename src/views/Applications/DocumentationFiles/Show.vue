<template>
	<Layout>
		<template #title>
			<RouterLink v-if="application" :to="{name: 'applications.show', params: {id: application.id}}" class="tool tool-primary">
				<i class="fa-solid fa-chevron-left"></i>
				<span class="truncate">{{ application.offer.title }}</span>
			</RouterLink>
			<RouterLink v-else :to="{name: 'applications'}" class="tool tool-primary">
				<i class="fa-solid fa-chevron-left"></i>
				Applications
			</RouterLink>
		</template>
		<template #status></template>
		<template #tools>
			<button type="button" class="tool tool-primary" @click="applicationStore.fetchDocumentationFile(id)">
				<i class="fa-solid fa-spinner animate-spin" v-if="fetchingDocumentationFile"></i>
				<i class="fa-solid fa-sync" v-else></i>
			</button>
		</template>
		<iframe v-if="documentationFile" class="w-full h-full" :src="documentationFile"></iframe>
		<Loading v-else/>
	</Layout>
</template>

<script lang="ts">
import Layout from '@/Layout.vue'
import Loading from '@/components/Loading.vue'
import type Application from '@/types/Application'
import {useApplicationStore} from '@/stores/applications'

export default {
	name: "Show",
	components: {
		Loading,
		Layout
	},
	props: {
		id: {
			type: String,
			required: true,
		}
	},
	computed: {
		fetchingDocumentationFile(): boolean{
			return this.applicationStore.fetchingDocumentationFile
		},
		application(): Application | null{
			return this.applicationStore.application
		},
		documentationFile(): string | null{
			return this.applicationStore.documentationFile
		}
	},
	setup(){
		const applicationStore = useApplicationStore()
		return {
			applicationStore,
		}
	},
	created(){
		this.applicationStore.getDocumentationFile(this.$props.id)
	}
}
</script>