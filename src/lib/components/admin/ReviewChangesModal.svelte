<script lang="ts">
	import Icon from '@iconify/svelte';

	interface FileChange {
		filename: string;
		status: 'added' | 'modified' | 'removed' | 'renamed';
		patch?: string;
		additions?: number;
		deletions?: number;
	}

	interface WorkspaceChanges {
		files: FileChange[];
		commitCount: number;
		lastCommit?: {
			sha: string;
			message: string;
			author: string;
			date: string;
		};
	}

	let { 
		isOpen = $bindable(false),
		workspaceChanges = $bindable<WorkspaceChanges | null>(null),
		currentWorkspace = '',
		onClose = () => {},
		onCreatePR = (title: string, body: string) => {}
	} = $props();

	let prTitle = $state('');
	let prBody = $state('');
	let isCreatingPR = $state(false);
	let selectedFile = $state<FileChange | null>(null);
	let showDiff = $state(false);

	// Auto-generate PR title and body when changes are loaded
	$effect(() => {
		if (workspaceChanges && workspaceChanges.files.length > 0) {
			const workspaceName = currentWorkspace.split('/')[1] || currentWorkspace;
			prTitle = `Update ${workspaceName} workspace`;
			
			const fileDescriptions = workspaceChanges.files.map(file => {
				const status = file.status.charAt(0).toUpperCase() + file.status.slice(1);
				const filename = file.filename.replace(/^content\//, '');
				return `- ${status}: ${filename}`;
			}).join('\n');
			
			prBody = `## Changes from ${workspaceName} workspace

${fileDescriptions}

${workspaceChanges.lastCommit ? 
`### Latest Commit
**${workspaceChanges.lastCommit.message}**
- Author: ${workspaceChanges.lastCommit.author}
- Date: ${new Date(workspaceChanges.lastCommit.date).toLocaleString()}
` : ''}

---
*This pull request was created from the admin panel.*`;
		}
	});

	function getStatusColor(status: string) {
		switch (status) {
			case 'added': return 'text-green-600 bg-green-50';
			case 'modified': return 'text-blue-600 bg-blue-50';
			case 'removed': return 'text-red-600 bg-red-50';
			case 'renamed': return 'text-purple-600 bg-purple-50';
			default: return 'text-gray-600 bg-gray-50';
		}
	}

	function getStatusIcon(status: string) {
		switch (status) {
			case 'added': return 'tabler:plus';
			case 'modified': return 'tabler:edit';
			case 'removed': return 'tabler:trash';
			case 'renamed': return 'tabler:arrows-right';
			default: return 'tabler:file';
		}
	}

	async function handleCreatePR() {
		if (!prTitle.trim()) return;
		
		isCreatingPR = true;
		try {
			await onCreatePR(prTitle.trim(), prBody.trim());
			onClose();
		} catch (error) {
			console.error('Failed to create PR:', error);
			alert('Failed to create pull request. Please try again.');
		} finally {
			isCreatingPR = false;
		}
	}

	function viewFileDiff(file: FileChange) {
		selectedFile = file;
		showDiff = true;
	}

	function closeModal() {
		if (!isCreatingPR) {
			onClose();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- Backdrop -->
{#if isOpen}
	<button
		type="button"
		class="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 cursor-default"
		onclick={closeModal}
		onkeydown={(e) => e.key === 'Enter' && closeModal()}
		aria-label="Close modal"
	></button>
{/if}

<!-- Modal -->
{#if isOpen}
	<div class="fixed inset-0 flex items-center justify-center z-50 p-4">
		<div class="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
			<!-- Header -->
			<div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
				<div>
					<h2 class="text-xl font-semibold text-gray-900">Review & Publish Changes</h2>
					<p class="text-sm text-gray-500 mt-1">Workspace: {currentWorkspace}</p>
				</div>
				<button
					onclick={closeModal}
					disabled={isCreatingPR}
					class="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
					aria-label="Close modal"
				>
					<Icon icon="tabler:x" class="w-5 h-5 text-gray-500" />
				</button>
			</div>

			<!-- Content -->
			<div class="flex-1 overflow-y-auto px-6 py-4">
				{#if workspaceChanges}
					<!-- Summary -->
					<div class="bg-gray-50 rounded-lg p-4 mb-6">
						<div class="flex items-center justify-between mb-3">
							<h3 class="font-medium text-gray-900">Change Summary</h3>
							<span class="text-sm text-gray-500">
								{workspaceChanges.commitCount} commit{workspaceChanges.commitCount !== 1 ? 's' : ''}
							</span>
						</div>
						<div class="flex flex-wrap gap-2">
							<span class="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
								{workspaceChanges.files.length} file{workspaceChanges.files.length !== 1 ? 's' : ''} changed
							</span>
							{#if workspaceChanges.files.some((f: FileChange) => f.status === 'added')}
								<span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
									{workspaceChanges.files.filter((f: FileChange) => f.status === 'added').length} added
								</span>
							{/if}
							{#if workspaceChanges.files.some((f: FileChange) => f.status === 'modified')}
								<span class="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
									{workspaceChanges.files.filter((f: FileChange) => f.status === 'modified').length} modified
								</span>
							{/if}
							{#if workspaceChanges.files.some((f: FileChange) => f.status === 'removed')}
								<span class="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
									{workspaceChanges.files.filter((f: FileChange) => f.status === 'removed').length} removed
								</span>
							{/if}
						</div>
					</div>

					<!-- Files List -->
					<div class="mb-6">
						<h3 class="font-medium text-gray-900 mb-3">Changed Files</h3>
						<div class="space-y-2">
							{#each workspaceChanges.files as file}
								<div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
									<div class="flex items-center gap-3">
										<Icon icon={getStatusIcon(file.status)} class="w-4 h-4 text-gray-500" />
										<div>
											<div class="font-medium text-gray-900">{file.filename.replace(/^content\//, '')}</div>
											<div class="flex items-center gap-2 mt-1">
												<span class="text-xs px-2 py-1 rounded-full {getStatusColor(file.status)}">
													{file.status}
												</span>
												{#if file.additions || file.deletions}
													<span class="text-xs text-gray-500">
														{#if file.additions}+{file.additions}{/if}
														{#if file.additions && file.deletions} / {/if}
														{#if file.deletions}-{file.deletions}{/if}
													</span>
												{/if}
											</div>
										</div>
									</div>
									{#if file.patch}
										<button
											onclick={() => viewFileDiff(file)}
											class="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
										>
											View Diff
										</button>
									{/if}
								</div>
							{/each}
						</div>
					</div>

					<!-- PR Details -->
					<div>
						<h3 class="font-medium text-gray-900 mb-3">Pull Request Details</h3>
						<div class="space-y-4">
							<div>
								<label for="pr-title" class="block text-sm font-medium text-gray-700 mb-2">
									Title
								</label>
								<input
									id="pr-title"
									type="text"
									bind:value={prTitle}
									placeholder="Enter pull request title..."
									class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
							<div>
								<label for="pr-body" class="block text-sm font-medium text-gray-700 mb-2">
									Description
								</label>
								<textarea
									id="pr-body"
									bind:value={prBody}
									placeholder="Describe your changes..."
									rows="6"
									class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								></textarea>
							</div>
						</div>
					</div>
				{:else}
					<div class="text-center py-8 text-gray-500">
						<p>No changes to review</p>
					</div>
				{/if}
			</div>

			<!-- Footer -->
			<div class="flex items-center justify-between px-6 py-4 border-t border-gray-100">
				<button
					onclick={closeModal}
					disabled={isCreatingPR}
					class="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
				>
					Cancel
				</button>
				<button
					onclick={handleCreatePR}
					disabled={isCreatingPR || !prTitle.trim() || !workspaceChanges?.files.length}
					class="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{#if isCreatingPR}
						<div class="flex items-center gap-2">
							<Icon icon="tabler:loader-2" class="w-4 h-4 animate-spin" />
							Creating PR...
						</div>
					{:else}
						Create Pull Request
					{/if}
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- Diff Modal -->
{#if showDiff && selectedFile}
	<div class="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
		<div class="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
			<!-- Diff Header -->
			<div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
				<div>
					<h3 class="text-lg font-semibold text-gray-900">File Diff</h3>
					<p class="text-sm text-gray-500 mt-1">{selectedFile.filename.replace(/^content\//, '')}</p>
				</div>
				<button
					onclick={() => showDiff = false}
					class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
				>
					<Icon icon="tabler:x" class="w-5 h-5 text-gray-500" />
				</button>
			</div>

			<!-- Diff Content -->
			<div class="flex-1 overflow-y-auto px-6 py-4">
				{#if selectedFile.patch}
					<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">{selectedFile.patch}</pre>
				{:else}
					<p class="text-gray-500 text-center py-8">No diff available</p>
				{/if}
			</div>
		</div>
	</div>
{/if}
