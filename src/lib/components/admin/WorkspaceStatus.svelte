<script lang="ts">
	import Icon from '@iconify/svelte';

	interface WorkspaceStatus {
		isPublished: boolean;
		publishDate?: string;
		publishedBy?: string;
		version: number;
		lastModified: string;
	}

	let { 
		filePath = '',
		content = null,
		onPublish = async (action: string) => {}
	} = $props();

	let workspaceStatus = $state<WorkspaceStatus | null>(null);
	let isLoadingStatus = $state(true);

	async function loadWorkspaceStatus() {
		if (!filePath) return;

		isLoadingStatus = true;
		try {
			const response = await fetch(`/api/content/publish/status?path=${encodeURIComponent(filePath)}`);
			if (response.ok) {
				const data = await response.json();
				workspaceStatus = data.status;
			}
		} catch (error) {
			console.error('Failed to load workspace status:', error);
		} finally {
			isLoadingStatus = false;
		}
	}

	async function handleDelete() {
		if (!filePath) return;
		
		if (!confirm(`Are you sure you want to delete ${filePath}? This action cannot be undone.`)) {
			return;
		}

		try {
			await onPublish('delete');
		} catch (error) {
			console.error('Failed to delete file:', error);
			alert('Failed to delete file. Please try again.');
		}
	}

	// Load status when component mounts or file path changes
	$effect(() => {
		if (filePath) {
			loadWorkspaceStatus();
		}
	});
</script>

<div class="">
	<h2 class="text-lg font-semibold text-gray-900 mb-4">Workspace Status</h2>

	<!-- Workspace Status -->
	{#if isLoadingStatus}
		<div class="flex justify-center py-4">
			<div class="text-gray-500">Loading status...</div>
		</div>
	{:else if workspaceStatus}
		<div class="bg-gray-50 rounded-lg p-4 mb-6">
			<h3 class="text-sm font-medium text-gray-900 mb-3">Current Status</h3>
			<div class="space-y-2 text-sm">
				<div class="flex justify-between">
					<span class="text-gray-600">Status:</span>
					<span class="font-medium">
						{#if workspaceStatus.isPublished}
							<span class="text-green-600">Published</span>
						{:else}
							<span class="text-yellow-600">Draft</span>
						{/if}
					</span>
				</div>
				
				<div class="flex justify-between">
					<span class="text-gray-600">Version:</span>
					<span class="font-medium">{workspaceStatus.version}</span>
				</div>
				
				<div class="flex justify-between">
					<span class="text-gray-600">Last Modified:</span>
					<span class="font-medium">{new Date(workspaceStatus.lastModified).toLocaleString()}</span>
				</div>
				
				{#if workspaceStatus.isPublished}
					{#if workspaceStatus.publishDate}
						<div class="flex justify-between">
							<span class="text-gray-600">Published:</span>
							<span class="font-medium">{new Date(workspaceStatus.publishDate).toLocaleString()}</span>
						</div>
					{/if}
					
					{#if workspaceStatus.publishedBy}
						<div class="flex justify-between">
							<span class="text-gray-600">Published By:</span>
							<span class="font-medium">{workspaceStatus.publishedBy}</span>
						</div>
					{/if}
				{/if}
			</div>
		</div>

		<!-- Workspace Actions -->
		<div class="space-y-3">
			<h3 class="text-sm font-medium text-gray-900">Actions</h3>
			
			<!-- Delete Action -->
			<div class="flex items-center justify-between p-3 border border-red-200 hover:bg-red-50 rounded-lg">
				<div class="flex items-center space-x-3">
					<Icon icon="tabler:trash" class="w-5 h-5 text-red-600" />
					<div>
						<div class="font-medium text-red-600">Delete File</div>
						<div class="text-sm text-red-600">Permanently delete this file from workspace</div>
					</div>
				</div>
				
				<button
					onclick={handleDelete}
					class="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 cursor-pointer"
				>
					Delete
				</button>
			</div>
		</div>

		<!-- Note about publishing -->
		<div class="mt-6 p-3 bg-blue-50 rounded-lg">
			<div class="flex items-start gap-2">
				<Icon icon="tabler:info-circle" class="w-4 h-4 text-blue-600 mt-0.5" />
				<div class="text-sm text-blue-700">
					<p class="font-medium mb-1">Publishing Workflow</p>
					<p class="text-xs">Use the "Review & Publish Changes" button in the header to create a pull request when you're ready to publish your workspace changes.</p>
				</div>
			</div>
		</div>
	{:else}
		<div class="text-center py-8 text-gray-500">
			<p>Unable to load status</p>
		</div>
	{/if}
</div>
