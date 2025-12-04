<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

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
				<svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
				</svg>
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
							<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							Connecting to GitHub...
						{:else}
							<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>
							</svg>
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
