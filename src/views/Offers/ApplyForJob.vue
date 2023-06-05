<template>
	<Layout>
		<template #title>
			<RouterLink v-if="offer" :to="{name: 'offers.job.show', params: {id: offer.id}}" class="tool tool-primary">
				<i class="fa-solid fa-chevron-left"></i> <span class="truncate">{{ offer.title }}</span>
			</RouterLink>
		</template>
		<template #status></template>
		<template #tools>
			<button type="button" class="tool tool-primary" @click="apply">
				<i class="fa-solid fa-spinner animate-spin" v-if="applying"></i>
				<i class="fa-solid fa-upload" v-else></i>
			</button>
		</template>
		<form v-if="offer && !applying" ref="form" class="p-4 flex flex-col gap-3" @submit.prevent="apply">
			<input type="file" id="files" ref="input" accept="application/pdf" class="file-input" multiple required>
			<LabeledObject>
				<template #label>Comments</template>
				<textarea id="comments" name="comments" v-model="comments"></textarea>
			</LabeledObject>
		</form>
		<Loading v-else/>
	</Layout>
</template>

<script lang="ts">
import Layout from '@/Layout.vue'
import Loading from '@/components/Loading.vue'
import {type Ref, ref, type UnwrapRef} from 'vue'
import type JobOffer from '@/types/Offer'
import {useOfferStore} from '@/stores/offers'
import LabeledObject from '@/components/LabeledObject.vue'

export default {
	name: "Apply",
	components: {
		LabeledObject,
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
		applying(): boolean{
			return this.offerStore.applying
		},
		offer(): JobOffer | null{
			return this.offerStore.offer as JobOffer
		},
	},
	setup(){
		const offerStore = useOfferStore()
		const comments: Ref<UnwrapRef<string>> = ref('')
		return {
			comments,
			offerStore,
		}
	},
	methods: {
		apply(): void{
			if(this.$refs && this.$refs.form && this.$refs.input){
				const form = this.$refs.form as HTMLFormElement
				const input = this.$refs.input as HTMLInputElement
				if(!form.checkValidity()){
					form.reportValidity()
				} else if(input.files){
					this.offerStore.apply(input.files, this.comments)
				} else {
					alert('You must select at least one file!')
				}
			} else {
				alert('Oops, something went wrong! Please try again later.')
			}
		}
	},
	created(){
		if(!this.offer){
			this.offerStore.get(this.$props.id)
		}
	}
}
</script>