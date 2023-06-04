<template>
	<Layout>
		<template #title>
			<RouterLink :to="{name: 'applications'}" class="tool tool-primary">
				<i class="fa-solid fa-chevron-left"></i>
				Applications
			</RouterLink>
		</template>
		<template #status></template>
		<template #tools>
			<button type="button" class="tool tool-primary" @click="applicationStore.fetch()">
				<i class="fa-solid fa-spinner animate-spin" v-if="fetching"></i>
				<i class="fa-solid fa-sync" v-else></i>
			</button>
		</template>
		<div v-if="application && !fetching" class="p-4 flex flex-col gap-3">
			<div class="flex justify-between items-center gap-2">
				<p class="font-light text-gray-400 text-sm">#{{ application.id.toString().padStart(5, '0') }}</p>
				<StatusIndicator :status="application.status"/>
			</div>
			<p class="font-bold text-lg">{{ application.offer.title }}</p>
			<LabeledObject>
				<template #label>Your documentation</template>
				<div class="flex flex-col items-stretch gap-1" v-if="application.documentation_files.length > 0">
					<RouterLink v-for="document in application.documentation_files" :to="{name: 'applications.files.show', params: {id: document.id}}" class="rounded bg-gray-100 text-gray-600 text-sm flex justify-between items-center px-2 py-1">
						<p class="font-medium">{{ printDateTime(document.created_at) }}</p>
						<i class="fa-solid fa-chevron-right"></i>
					</RouterLink>
					<RouterLink v-if="isDocumentation(application.status)" :to="{name: 'applications.files.upload', params: {id: application.id}}" class="rounded bg-purple-100 text-purple-700 text-sm flex justify-center items-center gap-2 px-2 py-1">
						<p class="font-medium">Upload Documentation</p>
						<i class="fa-solid fa-plus"></i>
					</RouterLink>
				</div>
				<div v-else class="alert alert-danger">You have not submitted any documentation.</div>
			</LabeledObject>
			<LabeledObject>
				<template #label>Comments</template>
				<Comment v-if="lastComment" :comment="lastComment" clamped/>
				<RouterLink v-if="application.comments.length > 1" :to="{name: 'applications.comments', params: {id: application.id}}" class="rounded bg-gray-100 text-gray-600 text-sm flex justify-between items-center px-2 py-1">
					<p class="font-medium">Read all comments</p>
					<i class="fa-solid fa-chevron-right"></i>
				</RouterLink>
			</LabeledObject>
			<LabeledObject @click="clampDescription = !clampDescription">
				<template #label>Description</template>
				<div :class="`text-sm text-gray-500${clampDescription ? ' line-clamp-6' : ''}`" v-html="application.offer.description"></div>
				<p class="font-medium text-sm text-gray-500" v-if="clampDescription">Tap on text to expand/collapse</p>
			</LabeledObject>
			<LabeledObject @click="clampRequirements = !clampRequirements">
				<template #label>Requirements</template>
				<div :class="`text-sm text-gray-500${clampRequirements ? ' line-clamp-6' : ''}`" v-html="application.offer.requirements"></div>
				<p class="font-medium text-sm text-gray-500" v-if="clampRequirements">Tap on text to expand/collapse</p>
			</LabeledObject>
		</div>
		<Loading v-else/>
	</Layout>
</template>

<script lang="ts">
import Layout from '@/Layout.vue'
import {RouterLink} from 'vue-router'
import Loading from '@/components/Loading.vue'
import Comment from '@/components/Comment.vue'
import type UserComment from '@/types/Comment'
import {ref, type Ref, type UnwrapRef} from 'vue'
import type Application from '@/types/Application'
import {isDocumentation, printDateTime} from '@/helpers'
import {useApplicationStore} from '@/stores/applications'
import LabeledObject from '@/components/LabeledObject.vue'
import StatusIndicator from '@/components/StatusIndicator.vue'

export default {
	name: "Index",
	components: {
		Comment,
		LabeledObject,
		StatusIndicator,
		RouterLink,
		Loading,
		Layout,
	},
	props: {
		id: {
			type: String,
			required: true,
		},
	},
	computed: {
		fetching():boolean{
			return this.applicationStore.fetching
		},
		application():Application|null{
			return this.applicationStore.application
		},
		applications():Application[]{
			return this.applicationStore.applications
		},
		lastComment():UserComment|null{
			if(this.application && this.application.comments.length > 0){
				return this.application.comments[0]
			}
			return null
		}
	},
	setup(){
		const applicationStore = useApplicationStore()
		const clampDescription: Ref<UnwrapRef<boolean>> = ref(true)
		const clampRequirements: Ref<UnwrapRef<boolean>> = ref(true)
		return {
			applicationStore,
			clampDescription,
			clampRequirements,
		}
	},
	methods: {
		isDocumentation,
		printDateTime,
	},
	created(){
		this.applicationStore.get(this.$props.id)
	}
}
</script>