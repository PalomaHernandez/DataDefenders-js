<template>
	<div v-if="isAccepted" class="badge badge-success">Accepted</div>
	<div v-else-if="isPending" class="badge badge-warning">Pending</div>
	<div v-else-if="isDocumentation" class="badge badge-purple">Requires Documentation</div>
	<div v-else-if="isRejected" class="badge badge-danger">Rejected</div>
</template>

<script lang="ts">
import {type Ref, ref, type UnwrapRef} from 'vue'
import {isAccepted, isRejected, isPending, isDocumentation} from '@/helpers'

export default {
	name: "StatusIndicator",
	props: {
		status: {
			type: String,
			required: true,
		},
	},
	computed: {
		isAccepted():boolean{
			return isAccepted(this.status)
		},
		isPending():boolean{
			return isPending(this.status)
		},
		isDocumentation():boolean{
			return isDocumentation(this.status)
		},
		isRejected():boolean{
			return isRejected(this.status)
		}
	},
	setup(props){
		const status: Ref<UnwrapRef<string>> = ref(props.status)
		return {
			status
		}
	}
}
</script>