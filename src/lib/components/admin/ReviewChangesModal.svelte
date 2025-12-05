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
		onCreatePR = (_title: string, _body: string) => {}
	} = $props();

	let prTitle = $state('');
	let prBody = $state('');
	let isCreatingPR = $state(false);
	let selectedFile = $state<FileChange | null>(null);
	let showDiff = $state(false);
	let activeStep = $state<'review' | 'details'>('review');

	// Computed counts
	const addedCount = $derived(workspaceChanges?.files.filter((f: FileChange) => f.status === 'added').length ?? 0);
	const modifiedCount = $derived(workspaceChanges?.files.filter((f: FileChange) => f.status === 'modified').length ?? 0);
	const removedCount = $derived(workspaceChanges?.files.filter((f: FileChange) => f.status === 'removed').length ?? 0);

	// Auto-generate PR title and body when changes are loaded
	$effect(() => {
		if (workspaceChanges && workspaceChanges.files.length > 0) {
			const workspaceName = currentWorkspace.split('/')[1] || currentWorkspace;
			prTitle = `Update ${workspaceName} workspace`;
			
			const fileDescriptions = workspaceChanges.files.map((file: FileChange) => {
				const status = file.status.charAt(0).toUpperCase() + file.status.slice(1);
				const filename = file.filename.replace(/^content\//, '');
				return `- ${status}: ${filename}`;
			}).join('\n');
			
			prBody = `## Changes from ${workspaceName} workspace

${fileDescriptions}

---
*This pull request was created from the admin panel.*`;
		}
	});

	// Reset step when modal opens
	$effect(() => {
		if (isOpen) {
			activeStep = 'review';
		}
	});

	function getStatusColor(status: string) {
		switch (status) {
			case 'added': return 'text-green-600 bg-green-50 border-green-200';
			case 'modified': return 'text-amber-600 bg-amber-50 border-amber-200';
			case 'removed': return 'text-red-600 bg-red-50 border-red-200';
			case 'renamed': return 'text-purple-600 bg-purple-50 border-purple-200';
			default: return 'text-gray-600 bg-gray-50 border-gray-200';
		}
	}

	function getStatusIcon(status: string) {
		switch (status) {
			case 'added': return 'tabler:file-plus';
			case 'modified': return 'tabler:file-pencil';
			case 'removed': return 'tabler:file-minus';
			case 'renamed': return 'tabler:file-arrow-right';
			default: return 'tabler:file';
		}
	}

	function getStatusLabel(status: string) {
		switch (status) {
			case 'added': return 'New';
			case 'modified': return 'Modified';
			case 'removed': return 'Deleted';
			case 'renamed': return 'Renamed';
			default: return 'Changed';
		}
	}

	function getContentType(filename: string): string {
		if (filename.includes('/domains/')) return 'Domain';
		if (filename.includes('/topics/')) return 'Topic';
		if (filename.includes('/modules/')) return 'Module';
		if (filename.includes('/articles/')) return 'Article';
		return 'File';
	}

	function getFileName(filename: string): string {
		const parts = filename.split('/');
		const name = parts[parts.length - 1];
		return name.replace(/\.(json|md)$/, '').replace(/-/g, ' ');
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
			activeStep = 'review';
			onClose();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			if (showDiff) {
				showDiff = false;
			} else {
				closeModal();
			}
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
	<!-- Backdrop -->
	<button
		type="button"
		class="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 cursor-default"
		onclick={closeModal}
		aria-label="Close modal"
	></button>

	<!-- Modal -->
	<div class="fixed inset-0 flex items-center justify-center z-50 p-4">
		<div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
			<!-- Header -->
			<div class="px-6 py-5 border-b border-gray-100">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-3">
						<div class="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
							<Icon icon="tabler:git-pull-request" class="w-5 h-5 text-green-600" />
						</div>
						<div>
							<h2 class="text-lg font-semibold text-gray-900">
								{activeStep === 'review' ? 'Review Changes' : 'Create Pull Request'}
							</h2>
							<p class="text-sm text-gray-500">{currentWorkspace}</p>
						</div>
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

				<!-- Step indicator -->
				<div class="flex items-center gap-2 mt-4">
					<button
						onclick={() => activeStep = 'review'}
						class={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
							activeStep === 'review' 
								? 'bg-green-100 text-green-700' 
								: 'text-gray-500 hover:bg-gray-100'
						}`}
					>
						<span class={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
							activeStep === 'review' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
						}`}>1</span>
						Review
					</button>
					<Icon icon="tabler:chevron-right" class="w-4 h-4 text-gray-300" />
					<button
						onclick={() => activeStep = 'details'}
						class={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
							activeStep === 'details' 
								? 'bg-green-100 text-green-700' 
								: 'text-gray-500 hover:bg-gray-100'
						}`}
					>
						<span class={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
							activeStep === 'details' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
						}`}>2</span>
						Submit
					</button>
				</div>
			</div>

			<!-- Content -->
			<div class="flex-1 overflow-y-auto">
				{#if workspaceChanges}
					{#if activeStep === 'review'}
						<!-- Summary Stats -->
						<div class="px-6 py-4 bg-gray-50 border-b border-gray-100">
							<div class="flex items-center gap-4">
								<div class="flex items-center gap-2">
									<span class="text-2xl font-bold text-gray-900">{workspaceChanges.files.length}</span>
									<span class="text-sm text-gray-500">changes</span>
								</div>
								<div class="h-8 w-px bg-gray-200"></div>
								{#if addedCount > 0}
									<div class="flex items-center gap-1.5 text-green-600">
										<Icon icon="tabler:plus" class="w-4 h-4" />
										<span class="text-sm font-medium">{addedCount} new</span>
									</div>
								{/if}
								{#if modifiedCount > 0}
									<div class="flex items-center gap-1.5 text-amber-600">
										<Icon icon="tabler:pencil" class="w-4 h-4" />
										<span class="text-sm font-medium">{modifiedCount} modified</span>
									</div>
								{/if}
								{#if removedCount > 0}
									<div class="flex items-center gap-1.5 text-red-600">
										<Icon icon="tabler:trash" class="w-4 h-4" />
										<span class="text-sm font-medium">{removedCount} deleted</span>
									</div>
								{/if}
							</div>
						</div>

						<!-- Files List -->
						<div class="px-6 py-4">
							<div class="space-y-2">
								{#each workspaceChanges.files as file}
									<div class={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${getStatusColor(file.status)}`}>
										<div class={`w-8 h-8 rounded-lg flex items-center justify-center ${
											file.status === 'added' ? 'bg-green-100' :
											file.status === 'modified' ? 'bg-amber-100' :
											file.status === 'removed' ? 'bg-red-100' : 'bg-gray-100'
										}`}>
											<Icon icon={getStatusIcon(file.status)} class="w-4 h-4" />
										</div>
										<div class="flex-1 min-w-0">
											<div class="flex items-center gap-2">
												<span class="font-medium text-gray-900 truncate capitalize">
													{getFileName(file.filename)}
												</span>
												<span class="text-xs px-1.5 py-0.5 rounded bg-white/50 text-gray-600">
													{getContentType(file.filename)}
												</span>
											</div>
											<div class="flex items-center gap-2 mt-0.5">
												<span class="text-xs font-medium">{getStatusLabel(file.status)}</span>
												{#if file.additions || file.deletions}
													<span class="text-xs opacity-75">
														{#if file.additions}+{file.additions}{/if}
														{#if file.additions && file.deletions} / {/if}
														{#if file.deletions}-{file.deletions}{/if}
													</span>
												{/if}
											</div>
										</div>
										{#if file.patch}
											<button
												onclick={() => viewFileDiff(file)}
												class="px-2.5 py-1.5 text-xs font-medium text-gray-600 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
											>
												View diff
											</button>
										{/if}
									</div>
								{/each}
							</div>
						</div>
					{:else}
						<!-- PR Details Form -->
						<div class="px-6 py-4 space-y-4">
							<div>
								<label for="pr-title" class="block text-sm font-medium text-gray-700 mb-2">
									Pull Request Title
								</label>
								<input
									id="pr-title"
									type="text"
									bind:value={prTitle}
									placeholder="Describe your changes..."
									class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
								/>
							</div>
							<div>
								<label for="pr-body" class="block text-sm font-medium text-gray-700 mb-2">
									Description <span class="text-gray-400 font-normal">(optional)</span>
								</label>
								<textarea
									id="pr-body"
									bind:value={prBody}
									placeholder="Add more details about your changes..."
									rows="8"
									class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 resize-none"
								></textarea>
							</div>

							<!-- Info box -->
							<div class="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
								<Icon icon="tabler:info-circle" class="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
								<div class="text-sm text-blue-800">
									<p class="font-medium">What happens next?</p>
									<p class="mt-1 text-blue-700">A pull request will be created on GitHub for review. Once approved and merged, your changes will be published to the main site.</p>
								</div>
							</div>
						</div>
					{/if}
				{:else}
					<div class="flex flex-col items-center justify-center py-12 text-gray-500">
						<Icon icon="tabler:file-off" class="w-12 h-12 mb-3 text-gray-300" />
						<p>No changes to review</p>
					</div>
				{/if}
			</div>

			<!-- Footer -->
			<div class="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
				{#if activeStep === 'review'}
					<button
						onclick={closeModal}
						disabled={isCreatingPR}
						class="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50"
					>
						Cancel
					</button>
					<button
						onclick={() => activeStep = 'details'}
						disabled={!workspaceChanges?.files.length}
						class="px-5 py-2.5 text-sm font-medium bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
					>
						Continue
						<Icon icon="tabler:arrow-right" class="w-4 h-4" />
					</button>
				{:else}
					<button
						onclick={() => activeStep = 'review'}
						disabled={isCreatingPR}
						class="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50 flex items-center gap-2"
					>
						<Icon icon="tabler:arrow-left" class="w-4 h-4" />
						Back
					</button>
					<button
						onclick={handleCreatePR}
						disabled={isCreatingPR || !prTitle.trim()}
						class="px-5 py-2.5 text-sm font-medium bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
					>
						{#if isCreatingPR}
							<Icon icon="tabler:loader-2" class="w-4 h-4 animate-spin" />
							Creating...
						{:else}
							<Icon icon="tabler:git-pull-request" class="w-4 h-4" />
							Create Pull Request
						{/if}
					</button>
				{/if}
			</div>
		</div>
	</div>
{/if}

<!-- Diff Modal -->
{#if showDiff && selectedFile}
	<div class="fixed inset-0 bg-black/40 backdrop-blur-sm z-60 flex items-center justify-center p-4">
		<div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden">
			<!-- Diff Header -->
			<div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
				<div class="flex items-center gap-3">
					<div class={`w-8 h-8 rounded-lg flex items-center justify-center ${
						selectedFile.status === 'added' ? 'bg-green-100 text-green-600' :
						selectedFile.status === 'modified' ? 'bg-amber-100 text-amber-600' :
						selectedFile.status === 'removed' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
					}`}>
						<Icon icon={getStatusIcon(selectedFile.status)} class="w-4 h-4" />
					</div>
					<div>
						<h3 class="font-semibold text-gray-900 capitalize">{getFileName(selectedFile.filename)}</h3>
						<p class="text-sm text-gray-500">{getContentType(selectedFile.filename)} • {getStatusLabel(selectedFile.status)}</p>
					</div>
				</div>
				<button
					onclick={() => showDiff = false}
					class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
					aria-label="Close diff"
				>
					<Icon icon="tabler:x" class="w-5 h-5 text-gray-500" />
				</button>
			</div>

			<!-- Diff Content -->
			<div class="flex-1 overflow-auto p-4 bg-gray-900">
				{#if selectedFile.patch}
					<pre class="text-sm font-mono text-gray-100 whitespace-pre-wrap">{selectedFile.patch}</pre>
				{:else}
					<div class="flex flex-col items-center justify-center py-12 text-gray-400">
						<Icon icon="tabler:file-off" class="w-8 h-8 mb-2" />
						<p>No diff available</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
