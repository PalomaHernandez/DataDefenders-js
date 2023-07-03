<template>
	<Layout>
		<template #title>
			<RouterLink :to="{name: 'offers.job'}" class="tool tool-primary">
				<i class="fa-solid fa-chevron-left"></i>
				Job Offers
			</RouterLink>
		</template>
		<template #status>
			<div v-if="success" class="alert alert-success" @click="offerStore.clearMessages()">{{ success }}</div>
			<div v-if="error" class="alert alert-danger" @click="offerStore.clearMessages()">{{ error }}</div>
			<div v-if="info" class="alert alert-info" @click="offerStore.clearMessages()">{{ info }}</div>
		</template>
		<template #tools>
			<template v-if="offer">
				<RouterLink v-if="!offer.has_applied" type="button" class="btn btn-primary" :to="{name: 'offers.job.apply', params: {id: offer.id} }">
					<i class="fa-solid fa-check"></i>
					Apply
				</RouterLink>
				<div v-else class="text-sky-700">You have applied!</div>
			</template>
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
            <LabeledObject @click="clampBenefits = !clampBenefits">
                <template #label>Benefits</template>
                <div :class="`text-sm text-gray-500${clampBenefits ? ' line-clamp-6' : ''}`" v-html="offer.benefits"></div>
                <p class="font-medium text-sm text-gray-500" v-if="clampBenefits">Tap on text to expand/collapse</p>
            </LabeledObject>
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
                <template #label>Interview at</template>
                <p class="text-sm text-gray-500">{{ printDateTime(offer.interview_at) }}</p>
            </LabeledObject>
            <p class="text-gray-700">Department of <span class="font-medium">{{ offer.department.name }}</span></p>
            <LabeledObject>
                <template #label>Majors</template>
                <ul class="text-gray-500">
                    <li v-for="major in offer.department.majors">{{ major.name }}</li>
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
import {type JobOffer} from '@/types/Offer'
import {useOfferStore} from '@/stores/offers'
import LabeledObject from '@/components/LabeledObject.vue'

export default {
	name: "Job",
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
		success(): string|null{
			return this.offerStore.success
		},
		error(): string|null{
			return this.offerStore.error
		},
		info(): string|null{
			return this.offerStore.info
		},
		fetching():boolean{
			return this.offerStore.fetching
		},
		offer():JobOffer|null{
			if(this.offerStore.offer){
                return this.offerStore.offer as JobOffer
            }
            return null
		},
		offers():Offer[]{
			return this.offerStore.offers
		},
	},
	setup(){
		const offerStore = useOfferStore()
        const clampBenefits: Ref<UnwrapRef<boolean>> = ref(true)
		const clampDescription: Ref<UnwrapRef<boolean>> = ref(true)
		const clampRequirements: Ref<UnwrapRef<boolean>> = ref(true)
		return {
			offerStore,
            clampBenefits,
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