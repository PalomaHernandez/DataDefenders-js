<template>
	<Layout>
		<template #title>
			<RouterLink v-if="application" :to="{name: 'applications.show', params: {id: application.id}}" class="tool tool-primary">
				<i class="fa-solid fa-chevron-left"></i>
				<span class="truncate">{{ application.offer.title }}</span>
			</RouterLink>
		</template>
		<template #status>
			<div v-if="success" class="alert alert-success" @click="applicationStore.clearMessages()">{{ success }}</div>
			<div v-if="error" class="alert alert-danger" @click="applicationStore.clearMessages()">{{ error }}</div>
			<div v-if="info" class="alert alert-info" @click="applicationStore.clearMessages()">{{ info }}</div>
		</template>
		<template #tools>
			<button type="button" class="tool tool-primary" @click="applicationStore.fetch()">
				<i class="fa-solid fa-spinner animate-spin" v-if="fetching"></i>
				<i class="fa-solid fa-sync" v-else></i>
			</button>
		</template>
		<div v-if="application" class="p-4 flex flex-col gap-3">
			<p class="font-bold text-lg">Comments</p>
			<Comment v-for="comment in application.comments" :comment="comment"/>
		</div>
		<Loading v-else/>
	</Layout>
</template>

<script lang="ts">
import Layout from '@/Layout.vue'
import Loading from '@/components/Loading.vue'
import type Application from '@/types/Application'
import {useApplicationStore} from '@/stores/applications'
import Comment from "@/components/Comment.vue";

export default {
	name: "Index",
	components: {
		Comment,
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
		success(): string|null{
			return this.applicationStore.success
		},
		error(): string|null{
			return this.applicationStore.error
		},
		info(): string|null{
			return this.applicationStore.info
		},
		fetching():boolean{
			return this.applicationStore.fetching
		},
		application():Application|null{
			return this.applicationStore.application
		}
	},
	setup(){
		const applicationStore = useApplicationStore()
		return {
			applicationStore,
		}
	},
	created(){
		if(!this.application){
			this.applicationStore.get(this.$props.id)
		}
	}
}
</script>