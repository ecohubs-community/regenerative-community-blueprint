<script lang="ts">

	interface Props {
		minWidth?: number;
		maxWidth?: number;
		defaultWidth?: number;
		storageKey?: string;
		children: import('svelte').Snippet;
	}

	const props: Props = $props();
	const minWidth = $derived(props.minWidth ?? 200);
	const maxWidth = $derived(props.maxWidth ?? 500);
	const defaultWidth = $derived(props.defaultWidth ?? 280);
	const storageKey = $derived(props.storageKey ?? 'sidebar-width');

	let width = $state(0);
	let isResizing = $state(false);
	let sidebarRef: HTMLElement;

	// Initialize width on mount
	$effect(() => {
		if (width === 0) {
			const savedWidth = localStorage.getItem(storageKey);
			if (savedWidth) {
				const parsed = parseInt(savedWidth, 10);
				if (!isNaN(parsed) && parsed >= minWidth && parsed <= maxWidth) {
					width = parsed;
					return;
				}
			}
			width = defaultWidth;
		}
	});

	function startResize(event: MouseEvent) {
		event.preventDefault();
		isResizing = true;
		document.body.style.cursor = 'col-resize';
		document.body.style.userSelect = 'none';

		const startX = event.clientX;
		const startWidth = width;

		function onMouseMove(e: MouseEvent) {
			const delta = e.clientX - startX;
			const newWidth = Math.min(maxWidth, Math.max(minWidth, startWidth + delta));
			width = newWidth;
		}

		function onMouseUp() {
			isResizing = false;
			document.body.style.cursor = '';
			document.body.style.userSelect = '';
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
			
			// Save to localStorage
			localStorage.setItem(storageKey, width.toString());
		}

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	}
</script>

<div 
	bind:this={sidebarRef}
	class="relative flex h-full"
	style="width: {width}px; min-width: {minWidth}px; max-width: {maxWidth}px;"
>
	<!-- Sidebar content -->
	<div class="flex-1 overflow-hidden flex flex-col">
		{@render props.children()}
	</div>

	<!-- Resize handle - using button for proper a11y -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		role="separator"
		aria-orientation="vertical"
		aria-valuenow={width}
		aria-valuemin={minWidth}
		aria-valuemax={maxWidth}
		tabindex="0"
		class="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize group z-10
			hover:bg-blue-400 transition-colors
			{isResizing ? 'bg-blue-500' : 'bg-transparent'}"
		onmousedown={startResize}
		onkeydown={(e) => {
			if (e.key === 'ArrowLeft') {
				width = Math.max(minWidth, width - 10);
				localStorage.setItem(storageKey, width.toString());
			} else if (e.key === 'ArrowRight') {
				width = Math.min(maxWidth, width + 10);
				localStorage.setItem(storageKey, width.toString());
			}
		}}
	>
		<!-- Visual indicator on hover -->
		<div class="absolute inset-y-0 -left-0.5 -right-0.5 group-hover:bg-blue-400/20 transition-colors"></div>
	</div>
</div>

<style>
	/* Prevent text selection during resize */
	:global(body.resizing) {
		user-select: none;
		cursor: col-resize;
	}
</style>
