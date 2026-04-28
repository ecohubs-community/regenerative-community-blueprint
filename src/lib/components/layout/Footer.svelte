<script lang="ts">
	import Icon from '@iconify/svelte';
	import { m } from '$lib/i18n';

	const year = new Date().getFullYear();
</script>

<footer class="border-t border-border bg-surface mt-auto">
	<div class="max-w-7xl mx-auto px-lg py-2xl">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 ">
			<!-- Brand -->
			<div class="space-y-4">
				<h3 class="text-lg font-bold text-gradient">
					{m('footer.brand_prefix')}
					<a href="https://ecohubs.community" class="hover:text-text-primary transition-colors underline">{m('site.brand')}</a>
				</h3>
				<p class="text-sm text-text-secondary max-w-full">
					{m('footer.tagline')}
				</p>
			</div>

			<!-- Links -->
			<div class="space-y-4">
				<h4 class="font-semibold text-primary">{m('footer.section.resources')}</h4>
				<ul class="space-y-2 text-sm text-text-secondary">
					<li>
						<a
							href="https://ecohubs.community"
							class="hover:text-text-primary transition-colors flex items-center gap-1"
						>
							{m('footer.link.about_us')}
							<Icon icon="tabler:arrow-up-right" class="w-4 h-4" />
						</a>
					</li>
					<li>
						<a
							href="https://ecohubs.community/membership"
							class="hover:text-text-primary transition-colors flex items-center gap-1"
						>
							{m('footer.link.join_us')}
							<Icon icon="tabler:arrow-up-right" class="w-4 h-4" />
						</a>
					</li>
				</ul>
			</div>

			<!-- Contact/Social -->
			<div class="space-y-4">
				<h4 class="font-semibold text-primary">{m('footer.section.connect')}</h4>
				<ul class="space-y-2 text-sm text-text-secondary">
					<li>
						<a
							href="https://github.com/ecohubs-community/regenerative-community-blueprint"
							target="_blank"
							rel="noreferrer"
							class="hover:text-text-primary transition-colors flex items-center gap-1"
						>
							{m('footer.link.github')}
							<Icon icon="tabler:arrow-up-right" class="w-4 h-4" />
						</a>
					</li>
				</ul>
			</div>
		</div>

		<div class="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
			<p class="text-xs text-text-tertiary">
				{m('footer.copyright', { year })}
			</p>
			<div class="flex gap-4 text-xs text-text-tertiary">
				<a
					href="https://ecohubs.community/privacy"
					class="hover:text-text-primary transition-colors flex items-center gap-1"
					target="_blank"
				>
					{m('footer.link.privacy')}
					<Icon icon="tabler:arrow-up-right" class="w-4 h-4" />
				</a>
				<a
					href="https://ecohubs.community/terms"
					class="hover:text-text-primary transition-colors flex items-center gap-1"
					target="_blank"
				>
					{m('footer.link.terms')}
					<Icon icon="tabler:arrow-up-right" class="w-4 h-4" />
				</a>
			</div>
		</div>
	</div>
</footer>
