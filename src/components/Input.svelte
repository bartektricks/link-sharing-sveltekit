<script lang="ts">
	import type { ComponentType } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	export let label: string;
	export let field: HTMLInputAttributes;
	export let error: string | null | undefined = undefined;
	export let icon: ComponentType | undefined = undefined;
</script>

<label>
	<span class="body-s">{label}</span>
	<div class="input-wrapper {error && 'has-error'}">
		<svelte:component this={icon} class="icon" />
		<input class="body-m {icon && 'with-icon'}" {...field} />
		{#if error}
			<p class="error">{error}</p>
		{/if}
	</div>
</label>

<style>
	label {
		--radius: 0.8rem;
		--padding-inline: 1.6rem;
		--state-color: var(--borders);

		display: flex;
		flex-direction: column;
		margin-bottom: 0.4rem;
	}

	label :global(.icon) {
		position: absolute;
		left: var(--padding-inline);
		max-width: var(--padding-inline);
	}

	.input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		border: 1px solid var(--state-color);
		border-radius: var(--radius);
		overflow: hidden;

		&.has-error {
			--state-color: var(--red);
		}
	}

	input {
		width: 100%;
		border: 0;
		border-radius: var(--radius);
		padding-inline: var(--padding-inline);
		padding-block: 1.2rem;
		color: var(--dark-grey);

		&::placeholder {
			opacity: 0.5;
		}

		&.with-icon {
			padding-inline-start: calc(var(--padding-inline) * 3);
		}
	}

	.error {
		position: absolute;
		right: var(--padding-inline);
		color: var(--state-color);
	}
</style>
