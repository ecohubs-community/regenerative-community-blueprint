<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';

	interface User {
		login: string;
		avatar_url: string;
		name?: string;
	}

	let { user }: { user: User | null } = $props();

	let isOpen = $state(false);
	let menuRef = $state<HTMLDivElement | null>(null);

	async function logout() {
		try {
			await fetch('/api/auth/logout', { method: 'POST' });
			goto('/admin/login');
		} catch (error) {
			console.error('Logout failed:', error);
		}
	}

	function toggleMenu() {
		isOpen = !isOpen;
	}

	function closeMenu() {
		isOpen = false;
	}

	function handleClickOutside(event: MouseEvent) {
		if (menuRef && !menuRef.contains(event.target as Node)) {
			closeMenu();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeMenu();
		}
	}

	$effect(() => {
		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
			document.addEventListener('keydown', handleKeydown);
		}
		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<div class="relative" bind:this={menuRef}>
	<button
		onclick={toggleMenu}
		class="flex items-center justify-center w-9 h-9 rounded-full overflow-hidden border-2 border-transparent hover:border-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
		aria-label="User menu"
		aria-expanded={isOpen}
		aria-haspopup="true"
	>
		{#if user?.avatar_url}
			<img
				src={user.avatar_url}
				alt={user.name || user.login}
				class="w-full h-full object-cover"
			/>
		{:else}
			<div class="w-full h-full bg-gray-200 flex items-center justify-center">
				<Icon icon="tabler:user" class="w-5 h-5 text-gray-500" />
			</div>
		{/if}
	</button>

	{#if isOpen}
		<div
			class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
			role="menu"
			aria-orientation="vertical"
		>
			<!-- User info header -->
			{#if user}
				<div class="px-4 py-3 border-b border-gray-100">
					<p class="text-sm font-medium text-gray-900">{user.name || user.login}</p>
					<p class="text-xs text-gray-500">@{user.login}</p>
				</div>
			{/if}

			<!-- Menu items -->
			<div class="py-1">
				<a
					href="/admin"
					onclick={closeMenu}
					class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
					role="menuitem"
				>
					<Icon icon="tabler:layout-dashboard" class="w-4 h-4 text-gray-400" />
					Dashboard
				</a>

				<a
					href="/"
					onclick={closeMenu}
					class="flex items-center justify-between gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
					role="menuitem"
					target="_blank"
				>
				<span class="flex items-center gap-3">
					<Icon icon="tabler:home" class="w-4 h-4 text-gray-400" />
					Website
				</span>
				<Icon icon="tabler:arrow-up-right" class="w-4 h-4 text-gray-400" />
				</a>

				<!--<button
					disabled
					class="flex items-center gap-3 px-4 py-2 text-sm text-gray-400 cursor-not-allowed w-full text-left"
					role="menuitem"
				>
					<Icon icon="tabler:settings" class="w-4 h-4" />
					Settings
					<span class="ml-auto text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">Soon</span>
				</button>-->
			</div>

			<!-- Logout -->
			<div class="border-t border-gray-100 py-1">
				<button
					onclick={logout}
					class="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
					role="menuitem"
				>
					<Icon icon="tabler:logout" class="w-4 h-4" />
					Sign out
				</button>
			</div>
		</div>
	{/if}
</div>
