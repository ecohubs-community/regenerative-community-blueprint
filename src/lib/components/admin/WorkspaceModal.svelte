<script lang="ts">
	import Icon from '@iconify/svelte';

	interface Workspace {
		name: string;
		fullName: string;
		commit: string;
		isDefault: boolean;
	}

	let {
		isOpen = $bindable(false),
		workspaces = [],
		currentWorkspace = '',
		isLoading = false,
		onClose = () => {},
		onSwitch = (name: string) => {},
		onCreate = (name: string, baseBranch?: string) => {}
	}: {
		isOpen: boolean;
		workspaces: Workspace[];
		currentWorkspace: string;
		isLoading: boolean;
		onClose: () => void;
		onSwitch: (name: string) => void;
		onCreate: (name: string, baseBranch?: string) => void;
	} = $props();

	let activeTab = $state<'select' | 'create'>('select');
	let newWorkspaceName = $state('');
	let selectedBaseBranch = $state<string>('');
	let isCreating = $state(false);
	let isSwitching = $state(false);

	function closeModal() {
		if (!isCreating && !isSwitching) {
			isOpen = false;
			onClose();
			// Reset form
			activeTab = 'select';
			newWorkspaceName = '';
			selectedBaseBranch = '';
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}

	async function handleSwitch(workspaceName: string) {
		if (workspaceName === currentWorkspace) {
			closeModal();
			return;
		}
		isSwitching = true;
		try {
			await onSwitch(workspaceName);
			closeModal();
		} finally {
			isSwitching = false;
		}
	}

	async function handleCreate() {
		if (!newWorkspaceName.trim()) return;

		isCreating = true;
		try {
			// Pass selectedBaseBranch as-is: empty string means "start from main"
			await onCreate(newWorkspaceName.trim(), selectedBaseBranch);
			closeModal();
		} finally {
			isCreating = false;
		}
	}

	function isValidWorkspaceName(name: string): boolean {
		return /^[a-zA-Z0-9._-]+$/.test(name);
	}

	const isNameValid = $derived(newWorkspaceName.trim() && isValidWorkspaceName(newWorkspaceName.trim()));
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
		<div class="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col max-h-[80vh]">
			<!-- Header -->
			<div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
				<h2 class="text-lg font-semibold text-gray-900">Workspace</h2>
				<button
					onclick={closeModal}
					disabled={isCreating || isSwitching}
					class="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
					aria-label="Close modal"
				>
					<Icon icon="tabler:x" class="w-5 h-5 text-gray-500" />
				</button>
			</div>

			<!-- Tabs -->
			<div class="flex border-b border-gray-100">
				<button
					onclick={() => activeTab = 'select'}
					class={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
						activeTab === 'select'
							? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
							: 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
					}`}
				>
					<div class="flex items-center justify-center gap-2">
						<Icon icon="tabler:folder" class="w-4 h-4" />
						Select Workspace
					</div>
				</button>
				<button
					onclick={() => activeTab = 'create'}
					class={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
						activeTab === 'create'
							? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
							: 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
					}`}
				>
					<div class="flex items-center justify-center gap-2">
						<Icon icon="tabler:plus" class="w-4 h-4" />
						Create New
					</div>
				</button>
			</div>

			<!-- Content -->
			<div class="flex-1 overflow-y-auto p-6">
				{#if activeTab === 'select'}
					<!-- Workspace List -->
					{#if isLoading}
						<div class="flex items-center justify-center py-8">
							<Icon icon="tabler:loader-2" class="w-6 h-6 text-gray-400 animate-spin" />
							<span class="ml-2 text-gray-500">Loading workspaces...</span>
						</div>
					{:else if workspaces.length === 0}
						<div class="text-center py-8">
							<div class="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
								<Icon icon="tabler:folder-off" class="w-6 h-6 text-gray-400" />
							</div>
							<p class="text-gray-500 mb-4">No workspaces found</p>
							<button
								onclick={() => activeTab = 'create'}
								class="text-blue-600 hover:text-blue-700 text-sm font-medium"
							>
								Create your first workspace
							</button>
						</div>
					{:else}
						<div class="space-y-2">
							{#each workspaces as workspace}
								<button
									onclick={() => handleSwitch(workspace.name)}
									disabled={isSwitching}
									class={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors text-left ${
										workspace.name === currentWorkspace
											? 'border-blue-200 bg-blue-50'
											: 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
									} ${isSwitching ? 'opacity-50 cursor-wait' : ''}`}
								>
									<div class={`w-10 h-10 rounded-lg flex items-center justify-center ${
										workspace.name === currentWorkspace ? 'bg-blue-100' : 'bg-gray-100'
									}`}>
										<Icon 
											icon={workspace.name === currentWorkspace ? 'tabler:folder-filled' : 'tabler:folder'} 
											class={`w-5 h-5 ${workspace.name === currentWorkspace ? 'text-blue-600' : 'text-gray-500'}`} 
										/>
									</div>
									<div class="flex-1 min-w-0">
										<div class="flex items-center gap-2">
											<span class={`font-medium truncate ${
												workspace.name === currentWorkspace ? 'text-blue-900' : 'text-gray-900'
											}`}>
												{workspace.name}
											</span>
											{#if workspace.isDefault}
												<span class="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
													default
												</span>
											{/if}
											{#if workspace.name === currentWorkspace}
												<span class="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">
													current
												</span>
											{/if}
										</div>
										<p class="text-xs text-gray-500 truncate mt-0.5">
											{workspace.commit ? `Last commit: ${workspace.commit.slice(0, 7)}` : 'No commits yet'}
										</p>
									</div>
									{#if workspace.name !== currentWorkspace}
										<Icon icon="tabler:chevron-right" class="w-5 h-5 text-gray-400" />
									{:else}
										<Icon icon="tabler:check" class="w-5 h-5 text-blue-600" />
									{/if}
								</button>
							{/each}
						</div>
					{/if}
				{:else}
					<!-- Create Workspace Form -->
					<div class="space-y-4">
						<div>
							<label for="workspace-name" class="block text-sm font-medium text-gray-700 mb-2">
								Workspace Name
							</label>
							<input
								id="workspace-name"
								type="text"
								bind:value={newWorkspaceName}
								placeholder="my-new-workspace"
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
							<p class="mt-1.5 text-xs text-gray-500">
								Use letters, numbers, dots, hyphens, and underscores only
							</p>
							{#if newWorkspaceName && !isNameValid}
								<p class="mt-1 text-xs text-red-500">
									Invalid characters in workspace name
								</p>
							{/if}
						</div>

						<div>
							<label for="base-branch" class="block text-sm font-medium text-gray-700 mb-2">
								Base Workspace <span class="text-gray-400 font-normal">(optional)</span>
							</label>
							<select
								id="base-branch"
								bind:value={selectedBaseBranch}
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
							>
								<option value="">Start from main branch</option>
								{#each workspaces as workspace}
									<option value={workspace.name}>{workspace.name}</option>
								{/each}
							</select>
							<p class="mt-1.5 text-xs text-gray-500">
								Copy content from an existing workspace or start fresh from main
							</p>
						</div>
					</div>
				{/if}
			</div>

			<!-- Footer -->
			{#if activeTab === 'create'}
				<div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
					<button
						onclick={closeModal}
						disabled={isCreating}
						class="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50"
					>
						Cancel
					</button>
					<button
						onclick={handleCreate}
						disabled={!isNameValid || isCreating}
						class="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
					>
						{#if isCreating}
							<Icon icon="tabler:loader-2" class="w-4 h-4 animate-spin" />
							Creating...
						{:else}
							<Icon icon="tabler:plus" class="w-4 h-4" />
							Create Workspace
						{/if}
					</button>
				</div>
			{/if}
		</div>
	</div>
{/if}
