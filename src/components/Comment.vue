<template>
	<div v-if="comment" class="px-3 py-2 rounded bg-gray-100 text-gray-700 flex flex-col gap-2">
		<div class="flex justify-between items-center gap-3">
			<p class="font-medium" v-html="fullName"></p>
			<p class="text-sm text-gray-400">{{ printDateTime(comment.created_at) }}</p>
		</div>
		<p :class="`text-sm${clamped ? ' line-clamp-6' : ''}`" v-html="comment.text"></p>
	</div>
</template>

<script lang="ts">
import {type PropType} from 'vue'
import {printDateTime} from '@/helpers'
import type UserComment from '@/types/Comment'

export default {
	name: "Comment",
	props: {
		comment: {
			type: Object as PropType<UserComment>,
			required: true,
		},
		clamped: {
			type: Boolean,
			default: () => {
				return false
			}
		}
	},
	computed: {
		fullName():string|null{
			if(this.$props.comment){
				if(this.$props.comment.user.middle_name){
					return `<b>${this.$props.comment.user.last_name}</b>, ${this.$props.comment.user.first_name} ${this.$props.comment.user.middle_name}`
				}
				return `<b>${this.$props.comment.user.last_name}</b>, ${this.$props.comment.user.first_name}`
			}
			return null
		}
	},
	methods: {
		printDateTime,
	}
}
</script>