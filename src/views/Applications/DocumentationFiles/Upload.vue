<template>
	<Layout>
		<template #title>
			<RouterLink v-if="application" :to="{name: 'applications.show', params: {id: application.id}}" class="tool tool-primary">
				<i class="fa-solid fa-chevron-left"></i> <span class="truncate">{{ application.offer.title }}</span>
			</RouterLink>
		</template>
		<template #status></template>
		<template #tools>
			<button type="button" class="tool tool-primary" @click="upload">
				<i class="fa-solid fa-spinner animate-spin" v-if="uploading"></i>
				<i class="fa-solid fa-upload" v-else></i>
			</button>
		</template>
		<form v-if="application && !uploading" ref="form" class="p-4 flex flex-col gap-3" @submit.prevent="upload">
			<input type="file" id="files" ref="input" accept="application/pdf" class="file-input" multiple required>
			<LabeledObject>
				<template #label>Comments</template>
				<textarea id="comments" name="comments" v-model="comment"></textarea>
			</LabeledObject>
		</form>
		<Loading v-else/>
	</Layout>
</template>

<script lang="ts">
import Layout from '@/Layout.vue'
import Loading from '@/components/Loading.vue'
import {type Ref, ref, type UnwrapRef} from 'vue'
import type Application from '@/types/Application'
import {useApplicationStore} from '@/stores/applications'
import LabeledObject from '@/components/LabeledObject.vue'

export default {
	name: "Show",
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
		uploading(): boolean{
			return this.applicationStore.uploading
		},
		application(): Application | null{
			return this.applicationStore.application
		}
	},
	setup(){
		const applicationStore = useApplicationStore()
		const comment: Ref<UnwrapRef<string>> = ref('')
		const files: Ref<UnwrapRef<FileList | null>> = ref(null)
		return {
			files,
			comment,
			applicationStore,
		}
	},
	methods: {
		upload(): void{
			if(this.$refs && this.$refs.form && this.$refs.input){
				const form = this.$refs.form as HTMLFormElement
				const input = this.$refs.input as HTMLInputElement
				if(!form.checkValidity()){
					form.reportValidity()
				} else if(input.files){
					this.applicationStore.upload(input.files)
				} else {
					alert('You must select at least one file!')
				}
			} else {
				alert('Oops, something went wrong! Please try again later.')
			}
		}
	},
	created(){
		if(!this.application){
			this.applicationStore.get(this.$props.id)
		}
	}
}
</script>