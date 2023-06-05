<template>
	<Layout>
		<template #title>Offers</template>
		<template #status></template>
		<template #tools>
			<button v-if="!selecting" type="button" class="tool tool-primary" @click="offerStore.load">
				<i class="fa-solid fa-spinner animate-spin" v-if="loading"></i>
				<i class="fa-solid fa-sync" v-else></i>
			</button>
		</template>
		<Loading v-if="loading"/>
			<div v-if="selecting">
				<button @click="offerSelected(OfferType.Job)">
					<p class="font-bold">
						<i class="fa-solid fa-briefcase"></i> 
						Job Offer 
					</p>
				</button>
				<button @click="offerSelected(OfferType.Scholarship)">
					<p class="font-bold">
						<i class="fa-solid fa-graduation-cap"></i> 
						Scholarship Offer 
					</p>
				</button>
			</div>
			<div v-else class="flex flex-col divide-y">
				<RouterLink v-for="offer in offers" :to="{name: route(), params: {id: offer.id} }" class="px-3 py-2 flex justify-between items-center gap-2 hover:bg-gray-100">
					<div class="flex flex-col items-start gap-2">
						<p class="font-bold">{{ offer.title }}</p>
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
import {useOfferStore} from '@/stores/offers'
import OfferType from '@/types/OfferType'

export default {
	name: "Index",
	components: {
		RouterLink,
		Loading,
		Layout,
	},
	computed: {
		loading(){
			return this.offerStore.loading
		},
		offers(){
			return this.offerStore.offers
		},
		offerType(){
			return this.offerStore.type
		},
		selecting(){
			return this.offerStore.selecting
		}
	},
	setup(){
		const offerStore = useOfferStore()

        return {
			OfferType,
			offerStore
		}
	},
	methods: {
		offerSelected(offerType: OfferType){
            this.offerStore.changeType(offerType)
        },
		route(): string{
			if(this.offerType === OfferType.Job){
				return 'offers.job.show'
			} else if(this.offerType === OfferType.Scholarship){
				return 'offers.scholarship.show'
			}
			return ''
		}
	},
	created(){
		this.offerStore.selecting = true
		if(this.offers.length === 0){
			this.offerStore.load()
		}
	}
}
</script>