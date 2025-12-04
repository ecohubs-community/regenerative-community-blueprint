<script lang="ts">
	export const ssr = false;
	let { children } = $props();
</script>
{@render children()}
