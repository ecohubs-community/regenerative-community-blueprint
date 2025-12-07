<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';

	interface ContentStats {
		articles: number;
		totalFiles: number;
	}

	interface RecentActivity {
		type: 'commit' | 'pr' | 'branch';
		title: string;
		description: string;
		timestamp: string;
		author: string;
		authorAvatar?: string;
		url?: string;
		status?: string;
	}

	interface WorkspaceInfo {
		name: string;
		fullName: string;
		isDefault: boolean;
		lastCommit?: {
			message: string;
			date: string;
		};
	}

	interface DashboardStats {
		content: ContentStats;
		recentActivity: RecentActivity[];
		workspaces: WorkspaceInfo[];
		pendingChanges: number;
		openPRs: number;
	}

	let { data } = $props();
	let loading = $state(true);
	let stats = $state<DashboardStats | null>(null);
	let error = $state<string | null>(null);

	// Quick actions
	const quickActions = [
		{ icon: 'tabler:file-plus', label: 'New Article', href: '/admin/content', color: 'bg-blue-500' },
		{ icon: 'tabler:git-pull-request', label: 'Create PR', action: 'pr', color: 'bg-green-500' },
		{ icon: 'tabler:refresh', label: 'Sync Changes', action: 'sync', color: 'bg-amber-500' }
	];

	onMount(async () => {
		await loadDashboardStats();
	});

	async function loadDashboardStats() {
		loading = true;
		error = null;
		
		try {
			const response = await fetch('/api/dashboard/stats');
			if (!response.ok) {
				throw new Error('Failed to load dashboard stats');
			}
			stats = await response.json();
		} catch (err) {
			console.error('Failed to load dashboard:', err);
			error = 'Failed to load dashboard data. Please try again.';
		} finally {
			loading = false;
		}
	}

	function formatRelativeTime(timestamp: string): string {
		const date = new Date(timestamp);
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffMins = Math.floor(diffMs / 60000);
		const diffHours = Math.floor(diffMs / 3600000);
		const diffDays = Math.floor(diffMs / 86400000);

		if (diffMins < 1) return 'Just now';
		if (diffMins < 60) return `${diffMins}m ago`;
		if (diffHours < 24) return `${diffHours}h ago`;
		if (diffDays < 7) return `${diffDays}d ago`;
		return date.toLocaleDateString();
	}

	function getActivityIcon(type: string): string {
		switch (type) {
			case 'commit': return 'tabler:git-commit';
			case 'pr': return 'tabler:git-pull-request';
			case 'branch': return 'tabler:git-branch';
			default: return 'tabler:activity';
		}
	}

	function getActivityColor(type: string, status?: string): string {
		if (type === 'pr') {
			if (status === 'open') return 'text-green-600 bg-green-100';
			if (status === 'closed') return 'text-purple-600 bg-purple-100';
			if (status === 'merged') return 'text-purple-600 bg-purple-100';
		}
		if (type === 'commit') return 'text-blue-600 bg-blue-100';
		return 'text-gray-600 bg-gray-100';
	}

	async function handleQuickAction(action: string) {
		if (action === 'sync') {
			await loadDashboardStats();
		} else if (action === 'pr') {
			// Trigger the review modal in the layout
			window.dispatchEvent(new CustomEvent('openReviewModal'));
		}
	}
</script>

<svelte:head>
	<title>Dashboard - EcoHubs Admin</title>
	<meta name="description" content="EcoHubs Admin Dashboard" />
</svelte:head>

<div class="space-y-6">
	<!-- Welcome Header -->
	<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">
				Welcome back{data?.user?.name ? `, ${data.user.name.split(' ')[0]}` : ''}!
			</h1>
			<p class="text-gray-500 mt-1">Here's what's happening with your content.</p>
		</div>
		<button
			onclick={() => goto('/admin/content')}
			class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium cursor-pointer"
		>
			<Icon icon="tabler:edit" class="w-5 h-5" />
			Edit Content
		</button>
	</div>

	{#if loading}
		<div class="flex items-center justify-center py-20">
			<div class="flex flex-col items-center gap-3">
				<div class="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
				<p class="text-gray-500 text-sm">Loading dashboard...</p>
			</div>
		</div>
	{:else if error}
		<div class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
			<Icon icon="tabler:alert-circle" class="w-10 h-10 text-red-500 mx-auto mb-3" />
			<p class="text-red-700 font-medium">{error}</p>
			<button
				onclick={loadDashboardStats}
				class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
			>
				Try Again
			</button>
		</div>
	{:else if stats}
		<!-- Stats Cards -->
		<div class="grid grid-cols-2 gap-4">
			<div class="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
				<div class="flex items-center gap-3">
					<div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
						<Icon icon="tabler:article" class="w-6 h-6 text-blue-600" />
					</div>
					<div>
						<p class="text-2xl font-bold text-gray-900">{stats.content.articles}</p>
						<p class="text-sm text-gray-500">Articles</p>
					</div>
				</div>
			</div>

			<div class="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
				<div class="flex items-center gap-3">
					<div class="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
						<Icon icon="tabler:files" class="w-6 h-6 text-green-600" />
					</div>
					<div>
						<p class="text-2xl font-bold text-gray-900">{stats.content.totalFiles}</p>
						<p class="text-sm text-gray-500">Total Files</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Status Cards -->
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
			<!-- Pending Changes -->
			<div class="bg-white rounded-xl border border-gray-200 p-5">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-3">
						<div class={`w-10 h-10 rounded-lg flex items-center justify-center ${stats.pendingChanges > 0 ? 'bg-amber-100' : 'bg-gray-100'}`}>
							<Icon icon="tabler:file-diff" class={`w-5 h-5 ${stats.pendingChanges > 0 ? 'text-amber-600' : 'text-gray-400'}`} />
						</div>
						<div>
							<p class="font-semibold text-gray-900">
								{stats.pendingChanges} pending change{stats.pendingChanges !== 1 ? 's' : ''}
							</p>
							<p class="text-sm text-gray-500">Ready to publish</p>
						</div>
					</div>
					{#if stats.pendingChanges > 0}
						<button
							onclick={() => handleQuickAction('pr')}
							class="px-3 py-1.5 text-sm font-medium text-amber-700 bg-amber-100 rounded-lg hover:bg-amber-200 transition-colors"
						>
							Review
						</button>
					{/if}
				</div>
			</div>

			<!-- Open PRs -->
			<div class="bg-white rounded-xl border border-gray-200 p-5">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-3">
						<div class={`w-10 h-10 rounded-lg flex items-center justify-center ${stats.openPRs > 0 ? 'bg-green-100' : 'bg-gray-100'}`}>
							<Icon icon="tabler:git-pull-request" class={`w-5 h-5 ${stats.openPRs > 0 ? 'text-green-600' : 'text-gray-400'}`} />
						</div>
						<div>
							<p class="font-semibold text-gray-900">
								{stats.openPRs} open PR{stats.openPRs !== 1 ? 's' : ''}
							</p>
							<p class="text-sm text-gray-500">Awaiting review</p>
						</div>
					</div>
					{#if stats.openPRs > 0}
						<a
							href="https://github.com/ecohubs-community/regenerative-community-blueprint/pulls"
							target="_blank"
							rel="noopener noreferrer"
							class="px-3 py-1.5 text-sm font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
						>
							View
						</a>
					{/if}
				</div>
			</div>
		</div>

		<!-- Main Grid -->
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<!-- Recent Activity -->
			<div class="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
				<div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
					<h2 class="font-semibold text-gray-900">Recent Activity</h2>
					<button
						onclick={loadDashboardStats}
						class="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
						title="Refresh"
					>
						<Icon icon="tabler:refresh" class="w-4 h-4" />
					</button>
				</div>
				
				{#if stats.recentActivity.length > 0}
					<div class="divide-y divide-gray-100">
						{#each stats.recentActivity as activity}
							<div class="px-5 py-4 hover:bg-gray-50 transition-colors">
								<div class="flex items-start gap-3">
									<div class={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${getActivityColor(activity.type, activity.status)}`}>
										<Icon icon={getActivityIcon(activity.type)} class="w-4 h-4" />
									</div>
									<div class="flex-1 min-w-0">
										<div class="flex items-center gap-2">
											<p class="font-medium text-gray-900 truncate">{activity.title}</p>
											{#if activity.status}
												<span class={`text-xs px-1.5 py-0.5 rounded capitalize ${
													activity.status === 'open' ? 'bg-green-100 text-green-700' :
													activity.status === 'merged' ? 'bg-purple-100 text-purple-700' :
													'bg-gray-100 text-gray-600'
												}`}>
													{activity.status}
												</span>
											{/if}
										</div>
										<p class="text-sm text-gray-500 mt-0.5">{activity.description}</p>
									</div>
									<span class="text-xs text-gray-400 shrink-0">{formatRelativeTime(activity.timestamp)}</span>
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="px-5 py-12 text-center">
						<Icon icon="tabler:activity-heartbeat" class="w-10 h-10 text-gray-300 mx-auto mb-3" />
						<p class="text-gray-500">No recent activity</p>
						<p class="text-sm text-gray-400 mt-1">Start editing content to see your activity here</p>
					</div>
				{/if}
			</div>

			<!-- Right Column -->
			<div class="space-y-6">
				<!-- Quick Actions -->
				<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
					<div class="px-5 py-4 border-b border-gray-100">
						<h2 class="font-semibold text-gray-900">Quick Actions</h2>
					</div>
					<div class="p-3 grid grid-cols-2 gap-2">
						{#each quickActions as action}
							{#if action.href}
								<a
									href={action.href}
									class="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
								>
									<div class={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
										<Icon icon={action.icon} class="w-5 h-5 text-white" />
									</div>
									<span class="text-sm font-medium text-gray-700">{action.label}</span>
								</a>
							{:else}
								<button
									onclick={() => handleQuickAction(action.action || '')}
									class="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
								>
									<div class={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
										<Icon icon={action.icon} class="w-5 h-5 text-white" />
									</div>
									<span class="text-sm font-medium text-gray-700">{action.label}</span>
								</button>
							{/if}
						{/each}
					</div>
				</div>

				<!-- Workspaces -->
				<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
					<div class="px-5 py-4 border-b border-gray-100">
						<h2 class="font-semibold text-gray-900">Your Workspaces</h2>
					</div>
					
					{#if stats.workspaces.length > 0}
						<div class="divide-y divide-gray-100">
							{#each stats.workspaces as workspace}
								<div class="px-5 py-3 hover:bg-gray-50 transition-colors">
									<div class="flex items-center justify-between">
										<div class="flex items-center gap-2">
											<Icon icon="tabler:folder" class={`w-4 h-4 ${workspace.isDefault ? 'text-blue-500' : 'text-gray-400'}`} />
											<span class="font-medium text-gray-900">{workspace.name}</span>
											{#if workspace.isDefault}
												<span class="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">Default</span>
											{/if}
										</div>
									</div>
									{#if workspace.lastCommit}
										<p class="text-xs text-gray-500 mt-1 ml-6 truncate">
											{workspace.lastCommit.message}
										</p>
									{/if}
								</div>
							{/each}
						</div>
					{:else}
						<div class="px-5 py-8 text-center">
							<Icon icon="tabler:folder-off" class="w-8 h-8 text-gray-300 mx-auto mb-2" />
							<p class="text-sm text-gray-500">No workspaces yet</p>
						</div>
					{/if}
				</div>

				<!-- Getting Started -->
				<div class="bg-linear-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white">
					<div class="flex items-start gap-3">
						<div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
							<Icon icon="tabler:bulb" class="w-5 h-5" />
						</div>
						<div>
							<h3 class="font-semibold">Getting Started</h3>
							<p class="text-sm text-blue-100 mt-1">
								Create and edit content in your workspace, then publish changes via pull requests.
							</p>
							<a
								href="/admin/content"
								class="inline-flex items-center gap-1 text-sm font-medium mt-3 hover:underline"
							>
								Start editing
								<Icon icon="tabler:arrow-right" class="w-4 h-4" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
