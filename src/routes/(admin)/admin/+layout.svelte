<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let { children, data } = $props();

	// Don't show layout on login page
	const isLoginPage = $page.url.pathname === '/admin/login';

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
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
</svelte:head>

{#if !isLoginPage}
	<div class="min-h-screen bg-gray-50">
		<!-- Top Navigation -->
		<nav class="bg-white shadow-sm border-b border-gray-200">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between h-16">
					<div class="flex items-center">
						<a href="/admin" class="text-xl font-semibold text-gray-900 hover:text-gray-700">
							EcoHubs Admin
						</a>
					</div>
					<div class="flex items-center space-x-4">
						{#if data?.user}
							<div class="flex items-center space-x-3">
								<img 
									src={data.user.avatar_url} 
									alt={data.user.name || data.user.login}
									class="h-8 w-8 rounded-full"
								/>
								<span class="text-sm text-gray-700">{data.user.name || data.user.login}</span>
							</div>
							<button
								onclick={logout}
								class="text-sm text-gray-500 hover:text-gray-700"
							>
								Logout
							</button>
						{/if}
					</div>
				</div>
			</div>
		</nav>

		<!-- Main Content -->
		<main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			<div class="px-4 py-6 sm:px-0">
				{@render children()}
			</div>
		</main>
	</div>
{:else}
	{@render children()}
{/if}
