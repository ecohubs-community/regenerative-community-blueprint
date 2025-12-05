<script lang="ts">
	interface PublishingStatus {
		isPublished: boolean;
		publishDate?: string;
		publishedBy?: string;
		version: number;
		lastModified: string;
	}

	interface PublishAction {
		id: string;
		name: string;
		description: string;
		icon: string;
		action: () => Promise<void>;
		disabled?: boolean;
		disabledReason?: string;
		isDangerous?: boolean;
	}

	let { 
		filePath,
		content,
		onPublish
	}: { 
		filePath: string;
		content: any;
		onPublish: (action: string) => Promise<void>;
	} = $props();

	let publishingStatus = $state<PublishingStatus | null>(null);
	let isLoadingStatus = $state(true);
	let isPublishing = $state(false);
	let selectedAction = $state<string>('');
	let showConfirmDialog = $state(false);

	// Define publishing actions
	const publishActions: PublishAction[] = [
		{
			id: 'draft',
			name: 'Save as Draft',
			description: 'Save content without publishing',
			icon: '📝',
			action: async () => await onPublish('draft')
		},
		{
			id: 'review',
			name: 'Submit for Review',
			description: 'Submit content for editorial review',
			icon: '👀',
			action: async () => await onPublish('review')
		},
		{
			id: 'publish',
			name: 'Publish Now',
			description: 'Publish content immediately',
			icon: '🚀',
			action: async () => await onPublish('publish')
		},
		{
			id: 'schedule',
			name: 'Schedule Publish',
			description: 'Schedule content for future publication',
			icon: '📅',
			action: async () => await onPublish('schedule')
		},
		{
			id: 'unpublish',
			name: 'Unpublish',
			description: 'Remove content from publication',
			icon: '🔒',
			action: async () => await onPublish('unpublish')
		},
		{
			id: 'delete',
			name: 'Delete',
			description: 'Delete article',
			icon: '🗑️',
			action: async () => await onPublish('delete'),
			isDangerous: true
		}
	];

	async function loadPublishingStatus() {
		if (!filePath) return;

		isLoadingStatus = true;
		try {
			const response = await fetch(`/api/content/publish/status?path=${encodeURIComponent(filePath)}`);
			if (response.ok) {
				const data = await response.json();
				publishingStatus = data.status;
			}
		} catch (error) {
			console.error('Failed to load publishing status:', error);
		} finally {
			isLoadingStatus = false;
		}
	}

	function getActionDisabled(action: PublishAction): boolean {
		if (action.id === 'publish') {
			return publishingStatus?.isPublished || false;
		}
		if (action.id === 'unpublish') {
			return !publishingStatus?.isPublished || false;
		}
		return false;
	}

	function getActionDisabledReason(action: PublishAction): string | undefined {
		if (action.id === 'publish' && publishingStatus?.isPublished) {
			return 'Already published';
		}
		if (action.id === 'unpublish' && !publishingStatus?.isPublished) {
			return 'Not published';
		}
		return undefined;
	}

	async function executeAction(action: PublishAction) {
		if (getActionDisabled(action)) return;

		selectedAction = action.id;
		showConfirmDialog = true;
	}

	async function confirmAction() {
		if (!selectedAction) return;

		isPublishing = true;
		try {
			const action = publishActions.find(a => a.id === selectedAction);
			if (action) {
				await action.action();
				// Reload status after publishing
				await loadPublishingStatus();
			}
		} catch (error) {
			console.error('Publishing failed:', error);
			alert('Publishing failed: ' + error);
		} finally {
			isPublishing = false;
			showConfirmDialog = false;
			selectedAction = '';
		}
	}

	function cancelAction() {
		showConfirmDialog = false;
		selectedAction = '';
	}

	// Load status when component mounts or file path changes
	$effect(() => {
		if (filePath) {
			loadPublishingStatus();
		}
	});
</script>

<div class="">
	<h2 class="text-lg font-semibold text-gray-900 mb-4">Publishing Workflow</h2>

	<!-- Publishing Status -->
	{#if isLoadingStatus}
		<div class="flex justify-center py-4">
			<div class="text-gray-500">Loading publishing status...</div>
		</div>
	{:else if publishingStatus}
		<div class="bg-gray-50 rounded-lg p-4 mb-6">
			<h3 class="text-sm font-medium text-gray-900 mb-3">Current Status</h3>
			<div class="space-y-2 text-sm">
				<div class="flex justify-between">
					<span class="text-gray-600">Status:</span>
					<span class="font-medium">
						{#if publishingStatus.isPublished}
							<span class="text-green-600">Published</span>
						{:else}
							<span class="text-yellow-600">Draft</span>
						{/if}
					</span>
				</div>
				
				<div class="flex justify-between">
					<span class="text-gray-600">Version:</span>
					<span class="font-medium">{publishingStatus.version}</span>
				</div>
				
				<div class="flex justify-between">
					<span class="text-gray-600">Last Modified:</span>
					<span class="font-medium">{new Date(publishingStatus.lastModified).toLocaleString()}</span>
				</div>
				
				{#if publishingStatus.isPublished}
					{#if publishingStatus.publishDate}
						<div class="flex justify-between">
							<span class="text-gray-600">Published:</span>
							<span class="font-medium">{new Date(publishingStatus.publishDate).toLocaleString()}</span>
						</div>
					{/if}
					
					{#if publishingStatus.publishedBy}
						<div class="flex justify-between">
							<span class="text-gray-600">Published By:</span>
							<span class="font-medium">{publishingStatus.publishedBy}</span>
						</div>
					{/if}
				{/if}
			</div>
		</div>
	{/if}

	<!-- Publishing Actions -->
	<div class="space-y-3">
		<h3 class="text-sm font-medium text-gray-900">Available Actions</h3>
		
		{#each publishActions as action}
			<div class="flex items-center justify-between p-3 border { action.isDangerous ? 'border-red-200 hover:bg-red-50' : 'border-gray-200 hover:bg-gray-50'} rounded-lg  {getActionDisabled(action) ? 'opacity-50' : ''}">
				<div class="flex items-center space-x-3">
					<span class="text-xl">{action.icon}</span>
					<div>
						<div class="font-medium {action.isDangerous ? 'text-red-600' : 'text-gray-900'}">{action.name}</div>
						<div class="text-sm {action.isDangerous ? 'text-red-600' : 'text-gray-600'}">{action.description}</div>
						{#if getActionDisabled(action) && getActionDisabledReason(action)}
							<div class="text-xs text-red-600 mt-1">{getActionDisabledReason(action)}</div>
						{/if}
					</div>
				</div>
				
				<button
					onclick={() => executeAction(action)}
					disabled={getActionDisabled(action) || isPublishing}
					class="px-3 py-1 {action.isDangerous ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white text-sm rounded  disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
				>
					Execute
				</button>
			</div>
		{/each}
	</div>

	<!-- Confirmation Dialog -->
	{#if showConfirmDialog}
		<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
				<div class="p-6">
					<h3 class="text-lg font-semibold text-gray-900 mb-4">
						Confirm {publishActions.find(a => a.id === selectedAction)?.name}
					</h3>
					
					<p class="text-gray-600 mb-6">
						Are you sure you want to {selectedAction} this content? This action may have immediate effects on the published site.
					</p>

					<div class="flex justify-end space-x-3">
						<button
							onclick={cancelAction}
							disabled={isPublishing}
							class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
						>
							Cancel
						</button>
						<button
							onclick={confirmAction}
							disabled={isPublishing}
							class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
						>
							{isPublishing ? 'Processing...' : 'Confirm'}
						</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
