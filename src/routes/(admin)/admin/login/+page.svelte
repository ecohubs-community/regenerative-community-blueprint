<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';

	let loading = false;
	let error: string | null = null;

	onMount(async () => {
		// Check if user is already authenticated
		try {
			const response = await fetch('/api/auth/me');
			if (response.ok) {
				const data = await response.json();
				if (data.authenticated) {
					await goto('/admin');
				}
			}
		} catch (err) {
			console.error('Auth check failed:', err);
		}
	});

	async function loginWithGitHub() {
		loading = true;
		error = null;
		
		try {
			window.location.href = '/api/auth/login';
		} catch (err) {
			error = 'Failed to initiate login. Please try again.';
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Login - Admin</title>
	<meta name="description" content="Login to EcoHubs Admin Dashboard" />
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full space-y-8">
		<div>
			<div class="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
				<Icon icon="tabler:lock" class="h-8 w-8 text-green-600" />
			</div>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
				Admin Login
			</h2>
			<p class="mt-2 text-center text-sm text-gray-600">
				Sign in to manage the EcoHubs Community Blueprint
			</p>
		</div>
		
		<div class="mt-8 space-y-6">
			<div class="rounded-md shadow-sm -space-y-px">
				<div class="text-center p-6 bg-white border border-gray-200 rounded-lg">
					<p class="text-sm text-gray-600 mb-4">
						Authentication is handled through GitHub. You must be a member of the organization or repository to access the admin area.
					</p>
					
					{#if error}
						<div class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
							<p class="text-sm text-red-600">{error}</p>
						</div>
					{/if}
					
					<button
						on:click={loginWithGitHub}
						disabled={loading}
						class="w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						{#if loading}
							<Icon icon="tabler:loader-2" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
							Connecting to GitHub...
						{:else}
							<Icon icon="tabler:brand-github" class="w-5 h-5 mr-2" />
							Sign in with GitHub
						{/if}
					</button>
				</div>
			</div>
			
			<div class="text-center">
				<a href="/" class="text-sm text-gray-600 hover:text-gray-900">
					← Back to main site
				</a>
			</div>
		</div>
	</div>
</div>
