<template>
	<Layout>
		<template #title>
			<p v-if="selecting">
				Offers
			</p>
			<button v-else type="button" class="tool tool-primary" @click="offerStore.toggleSelecting">
				<i class="fa-solid fa-chevron-left"></i>
				Offers
			</button>
		</template>
		<template #status></template>
		<template #tools>
			<button v-if="!selecting" type="button" class="tool tool-primary" @click="offerStore.load">
				<i class="fa-solid fa-spinner animate-spin" v-if="loading"></i>
				<i class="fa-solid fa-sync" v-else></i>
			</button>
		</template>
		<Loading v-if="loading"/>
		<div v-else-if="selecting" class="h-full flex flex-col md:flex-row justify-center items-stretch md:items-center gap-3 p-4">
			<button @click="offerStore.changeType(OfferType.Job)" class="font-bold p-12 rounded bg-sky-700 text-white flex flex-col items-center gap-2 text-2xl">
				<i class="fa-solid fa-briefcase fa-2x"></i>
				<span>Job Offers</span>
			</button>
			<button @click="offerStore.changeType(OfferType.Scholarship)" class="font-bold p-12 rounded bg-sky-700 text-white flex flex-col items-center gap-2 text-2xl">
				<i class="fa-solid fa-graduation-cap fa-2x"></i>
				<span>Scholarship Offers</span>
			</button>
		</div>
		<div v-else class="flex flex-col gap-3">
			<div class="p-4">
				<div v-if="type === OfferType.Job" class="text-xl font-bold flex items-center gap-2">
					<i class="fa-solid fa-briefcase"></i>
					Job Offers
				</div>
				<div v-else-if="type === OfferType.Scholarship" class="text-xl font-bold flex items-center gap-2">
					<i class="fa-solid fa-graduation-cap"></i>
					Scholarship Offers
				</div>
				<p v-else class="text-xl font-bold">All Offers</p>
			</div>
			<div class="flex flex-col divide-y">
				<RouterLink v-for="offer in offers" :to="{name: route(offer), params: {id: offer.id} }" class="px-3 py-2 flex justify-between items-center gap-2 hover:bg-gray-100">
					<p>{{ offer.title }}</p>
					<i class="fa-solid fa-chevron-right text-gray-400"></i>
				</RouterLink>
			</div>
		</div>
	</Layout>
</template>

<script lang="ts">
import Layout from '@/Layout.vue'
import {RouterLink} from 'vue-router'
import Loading from '@/components/Loading.vue'
import {useOfferStore} from '@/stores/offers'
import OfferType from '@/types/OfferType'
import type Offer from '@/types/Offer'

export default {
	name: "Index",
	components: {
		RouterLink,
		Loading,
		Layout,
	},
	computed: {
		OfferType(){
			return OfferType
		},
		loading(): boolean{
			return this.offerStore.loading
		},
		offers(): Offer[]{
			return this.offerStore.offers
		},
		selecting(): boolean{
			return this.offerStore.selecting
		},
		type(): OfferType|null{
			return this.offerStore.type
		}
	},
	setup(){
		const offerStore = useOfferStore()

        return {
			offerStore
		}
	},
	methods: {
		route(offer: Offer): string{
			if(offer.is_job_offer){
				return 'offers.job.show'
			} else if(offer.is_scholarship_offer){
				return 'offers.scholarship.show'
			}
			return ''
		}
	},
	created(){
		if(!this.type){
			this.offerStore.selecting = true
		} else if(this.offers.length === 0){
			this.offerStore.load()
		}
	}
}
</script>