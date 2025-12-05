<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';

	let user: any = null;
	let loading = true;

	onMount(async () => {
		try {
			const response = await fetch('/api/auth/me');
			if (!response.ok) {
				await goto('/admin/login');
				return;
			}
			
			const data = await response.json();
			if (!data.authenticated) {
				await goto('/admin/login');
				return;
			}
			
			user = data.user;
		} catch (error) {
			console.error('Auth check failed:', error);
			await goto('/admin/login');
		} finally {
			loading = false;
		}
	});

	async function logout() {
		try {
			await fetch('/api/auth/logout', { method: 'POST' });
			await goto('/admin/login');
		} catch (error) {
			console.error('Logout failed:', error);
		}
	}
</script>

<svelte:head>
	<title>Admin Dashboard - EcoHubs</title>
	<meta name="description" content="EcoHubs Admin Dashboard" />
</svelte:head>

{#if loading}
	<div class="min-h-screen flex items-center justify-center">
		<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
	</div>
{:else}
	<div class="min-h-screen bg-gray-50">
		

		<!-- Main Content -->
		<div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			<div class="px-4 py-6 sm:px-0">
				<div class="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
					<div class="text-center">
						<h2 class="text-2xl font-bold text-gray-900 mb-4">Welcome to the Admin Dashboard</h2>
						<p class="text-gray-600 mb-8">
							This is where you'll be able to manage the EcoHubs Community Blueprint content.
						</p>
						
						<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div class="bg-white p-6 rounded-lg shadow">
								<div class="text-green-600 mb-4">
									<Icon icon="tabler:folders" class="h-12 w-12 mx-auto" />
								</div>
								<h3 class="text-lg font-medium text-gray-900 mb-2">Content Management</h3>
								<p class="text-sm text-gray-600">Manage domains, topics, modules, and articles</p>
							</div>
							
							<div class="bg-white p-6 rounded-lg shadow">
								<div class="text-green-600 mb-4">
									<Icon icon="tabler:git-branch" class="h-12 w-12 mx-auto" />
								</div>
								<h3 class="text-lg font-medium text-gray-900 mb-2">Branch Management</h3>
								<p class="text-sm text-gray-600">Create and manage branches for content editing</p>
							</div>
							
							<div class="bg-white p-6 rounded-lg shadow">
								<div class="text-green-600 mb-4">
									<Icon icon="tabler:git-pull-request" class="h-12 w-12 mx-auto" />
								</div>
								<h3 class="text-lg font-medium text-gray-900 mb-2">Pull Requests</h3>
								<p class="text-sm text-gray-600">Review and manage pull requests for content changes</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
