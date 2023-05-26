<template>
	<div :class="classes">
		<p class="text-sm text-neutral-600"><slot name="label"/></p>
		<slot/>
	</div>
</template>

<script lang="ts">
import {ref} from 'vue'

export default {
	name: 'LabeledObject',
	props: {
		full: Boolean
	},
	setup(props){
		const classes = ref(props.full ? 'flex flex-col items-stretch gap-1' : 'flex flex-col gap-1')
		return {
			classes
		}
	}
}
</script>