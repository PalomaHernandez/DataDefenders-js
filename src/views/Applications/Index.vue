<template>
	<Layout>
		<template #title>Applications</template>
		<template #status>
			<div v-if="success" class="alert alert-success" @click="applicationStore.clearMessages()">{{ success }}</div>
			<div v-if="error" class="alert alert-danger" @click="applicationStore.clearMessages()">{{ error }}</div>
			<div v-if="info" class="alert alert-info" @click="applicationStore.clearMessages()">{{ info }}</div>
		</template>
		<template #tools>
			<button type="button" class="tool tool-primary" @click="applicationStore.toggleFiltering">
				<i class="fa-solid fa-gear"></i>
			</button>
			<button type="button" class="tool tool-primary" @click="applicationStore.load">
				<i class="fa-solid fa-spinner animate-spin" v-if="loading"></i>
				<i class="fa-solid fa-sync" v-else></i>
			</button>
		</template>
		<template #modals>
			<div class="modal" v-if="filtering">
				<div class="modal-dialog">
					<div class="modal-header">
						<p class="text-xl font-bold">Filters</p>
						<button type="button" class="btn btn-close" @click="applicationStore.toggleFiltering">
							<i class="fa-solid fa-times"></i>
						</button>
					</div>
					<div class="modal-body flex flex-col gap-2">
						<p class="font-medium text-lg">Offer Type</p>
						<button type="button" class="btn btn-primary" @click="applicationStore.switchType(OfferType.All)">All</button>
						<button type="button" class="btn btn-primary" @click="applicationStore.switchType(OfferType.Job)">Job</button>
						<button type="button" class="btn btn-primary" @click="applicationStore.switchType(OfferType.Scholarship)">Scholarship</button>
						<p class="font-medium text-lg">Status</p>
						<button type="button" class="btn btn-primary" @click="applicationStore.switchStatus(ApplicationStatus.All)">All</button>
						<button type="button" class="btn btn-pending" @click="applicationStore.switchStatus(ApplicationStatus.Pending)">Pending</button>
						<button type="button" class="btn btn-documentation" @click="applicationStore.switchStatus(ApplicationStatus.Documentation)">Documentation</button>
						<button type="button" class="btn btn-accepted" @click="applicationStore.switchStatus(ApplicationStatus.Accepted)">Accepted</button>
						<button type="button" class="btn btn-rejected" @click="applicationStore.switchStatus(ApplicationStatus.Rejected)">Rejected</button>
					</div>
				</div>
			</div>
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
import {ref} from 'vue'
import Layout from '@/Layout.vue'
import {RouterLink} from 'vue-router'
import OfferType from '@/types/OfferType'
import Loading from '@/components/Loading.vue'
import {useApplicationStore} from '@/stores/applications'
import StatusIndicator from '@/components/StatusIndicator.vue'
import ApplicationStatus from '@/types/ApplicationStatus'

export default {
	name: "Index",
	components: {
		StatusIndicator,
		RouterLink,
		Loading,
		Layout,
	},
	computed: {
		OfferType(){
			return OfferType
		},
		ApplicationStatus(){
			return ApplicationStatus
		},
		success(): string|null{
			return this.applicationStore.success
		},
		error(): string|null{
			return this.applicationStore.error
		},
		info(): string|null{
			return this.applicationStore.info
		},
		filtering(){
			return this.applicationStore.filtering
		},
		loading(){
			return this.applicationStore.loading
		},
		applications(){
			return this.applicationStore.applications
		}
	},
	setup(){
		const applicationStore = useApplicationStore()
		const showFilters = ref<boolean>()
		return {
			applicationStore,
			showFilters,
		}
	},
	created(){
		if(this.applications.length === 0){
			this.applicationStore.load()
		}
	}
}
</script>