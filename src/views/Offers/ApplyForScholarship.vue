<template>
	<Layout>
		<template #title>
			<RouterLink v-if="offer" :to="{name: 'offers.scholarship.show', params: {id: offer.id}}" class="tool tool-primary">
				<i class="fa-solid fa-chevron-left"></i> <span class="truncate">{{ offer.title }}</span>
			</RouterLink>
		</template>
		<template #status>
			<div v-if="success" class="alert alert-success" @click="offerStore.clearMessages()">{{ success }}</div>
			<div v-if="error" class="alert alert-danger" @click="offerStore.clearMessages()">{{ error }}</div>
			<div v-if="info" class="alert alert-info" @click="offerStore.clearMessages()">{{ info }}</div>
		</template>
		<template #tools>
			<button type="button" class="btn btn-primary" @click="apply">
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
            <LabeledObject>
				<template #label>Major</template>
				<select id="majorId" name="majorId" v-model="majorId">
                    <option v-for="major in offer.majors" :value="major.id">{{ major.name }}</option>
                </select>
			</LabeledObject>
		</form>
		<Loading v-else/>
	</Layout>
</template>

<script lang="ts">
import Layout from '@/Layout.vue'
import Loading from '@/components/Loading.vue'
import {type Ref, ref, type UnwrapRef} from 'vue'
import {useOfferStore} from '@/stores/offers'
import LabeledObject from '@/components/LabeledObject.vue'
import type { ScholarshipOffer } from '@/types/Offer'

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
		success(): string|null{
			return this.offerStore.success
		},
		error(): string|null{
			return this.offerStore.error
		},
		info(): string|null{
			return this.offerStore.info
		},
		applying(): boolean{
			return this.offerStore.applying
		},
		offer(): ScholarshipOffer | null{
			return this.offerStore.offer as ScholarshipOffer
		},
	},
	setup(){
		const offerStore = useOfferStore()
		const comments: Ref<UnwrapRef<string>> = ref('')
        const majorId: Ref<UnwrapRef<number | null>> = ref(null)
		return {
			comments,
            majorId,
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
					this.offerStore.apply(input.files, this.comments, this.majorId)
				} else {
					this.offerStore.showError('You must select at least one file!')
				}
			} else {
				this.offerStore.showError('Oops, something went wrong! Please try again later.')
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