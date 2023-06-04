<template>
	<div class="p-4 max-w-sm w-full mx-auto animate-pulse">
		<div class="flex-1 space-y-6 py-1">
			<div class="h-2 bg-blue-200 rounded"></div>
			<div class="space-y-3">
				<div class="grid grid-cols-3 gap-4">
					<div class="h-2 bg-blue-200 rounded col-span-2"></div>
					<div class="h-2 bg-blue-200 rounded col-span-1"></div>
				</div>
				<div class="h-2 bg-blue-200 rounded"></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: 'Loading'
}
</script>
