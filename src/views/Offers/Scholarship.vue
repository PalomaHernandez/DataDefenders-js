<template>
	<Layout>
		<template #title>
			<RouterLink :to="{name: 'offers.scholarship'}" class="tool tool-primary">
				<i class="fa-solid fa-chevron-left"></i>
				Scholarship Offers
			</RouterLink>
		</template>
		<template #status></template>
		<template #tools>
			<RouterLink v-if="offer && !offer.has_applied" :to="{name: 'offers.scholarship.apply', params: {id: offer.id}}" class="btn btn-primary">
				<i class="fa-solid fa-check"></i>
				Apply
			</RouterLink>
			<button type="button" class="tool tool-primary" @click="offerStore.fetch()">
				<i class="fa-solid fa-spinner animate-spin" v-if="fetching"></i>
				<i class="fa-solid fa-sync" v-else></i>
			</button>
		</template>
		<div v-if="offer && !fetching" class="p-4 flex flex-col gap-3">
			<div class="flex justify-between items-center gap-2">
				<p class="font-light text-gray-400 text-sm">#{{ offer.id.toString().padStart(5, '0') }}</p>
			</div>
			<p class="font-bold text-lg">{{ offer.title }}</p>
            <LabeledObject @click="clampDescription = !clampDescription">
                <template #label>Description</template>
                <div :class="`text-sm text-gray-500${clampDescription ? ' line-clamp-6' : ''}`" v-html="offer.description"></div>
                <p class="font-medium text-sm text-gray-500" v-if="clampDescription">Tap on text to expand/collapse</p>
            </LabeledObject>
            <LabeledObject @click="clampRequirements = !clampRequirements">
                <template #label>Requirements</template>
                <div :class="`text-sm text-gray-500${clampRequirements ? ' line-clamp-6' : ''}`" v-html="offer.requirements"></div>
                <p class="font-medium text-sm text-gray-500" v-if="clampRequirements">Tap on text to expand/collapse</p>
            </LabeledObject>
            <LabeledObject>
                <template #label>Starts at</template>
                <p class="text-sm text-gray-500">{{ printDateTime(offer.starts_at) }}</p>
            </LabeledObject>
			<LabeledObject>
                <template #label>Ends at</template>
                <p class="text-sm text-gray-500">{{ printDateTime(offer.ends_at) }}</p>
            </LabeledObject>
            <LabeledObject>
                <template #label>Majors</template>
                <ul class="text-gray-500">
                    <li v-for="major in offer.majors">{{ major.name }} in department {{ major.department.name }}</li>
                </ul>
            </LabeledObject>
		</div>
		<Loading v-else/>
	</Layout>
</template>

<script lang="ts">
import Layout from '@/Layout.vue'
import {RouterLink} from 'vue-router'
import Loading from '@/components/Loading.vue'
import {ref, type Ref, type UnwrapRef} from 'vue'
import {printDateTime} from '@/helpers'
import type Offer from '@/types/Offer'
import {type ScholarshipOffer} from '@/types/Offer'
import {useOfferStore} from '@/stores/offers'
import LabeledObject from '@/components/LabeledObject.vue'

export default {
	name: "Scholarship",
	components: {
		LabeledObject,
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
			return this.offerStore.fetching
		},
		offer():ScholarshipOffer|null{
			if(this.offerStore.offer){
                return this.offerStore.offer as ScholarshipOffer
            }
            return null
		},
		offers():Offer[]{
			return this.offerStore.offers
		},
	},
	setup(){
		const offerStore = useOfferStore()
		const clampDescription: Ref<UnwrapRef<boolean>> = ref(true)
		const clampRequirements: Ref<UnwrapRef<boolean>> = ref(true)
		return {
			offerStore,
			clampDescription,
			clampRequirements,
		}
	},
	methods: {
		printDateTime,
	},
	created(){
		this.offerStore.get(this.$props.id)
	}
}
</script>