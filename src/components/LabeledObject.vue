<template>
	<div :class="classes">
		<p :class="`text-sm font-medium text-neutral-600${required ? ' required' : ''}`"><slot name="label"/></p>
		<slot/>
	</div>
</template>

<script lang="ts">
import {ref} from 'vue'

export default {
	name: 'LabeledObject',
	props: {
		full: Boolean,
		required: Boolean,
	},
	setup(props){
		const classes = ref(props.full ? 'flex-grow flex flex-col items-stretch gap-1' : 'flex-grow flex flex-col gap-1')
		return {
			classes
		}
	}
}
</script>