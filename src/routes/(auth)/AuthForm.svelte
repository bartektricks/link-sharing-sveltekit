<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	export type Field = {
		label: string;
	} & HTMLInputAttributes;
</script>

<script lang="ts">
	export let title: string;
	export let subtitle: string;
	export let fields: Field[];
	export let submitText: string;
	export let errors: Record<string, string[]> = {};
</script>

<section class="auth-form">
	<header>
		<h1 class="heading-m">{title}</h1>
		<p class="body-m">{subtitle}</p>
	</header>

	<form method="POST">
		{#each fields as { label, ...field } (field.name)}
			<label>
				<span>{label}</span>
				<input {...field} />
				{#if field.name && errors[field.name]}
					<p class="error">{errors[field.name].join(', ')}</p>
				{/if}
			</label>
		{/each}
		<slot name="additional-fields" />
		<input type="submit" value={submitText} />
	</form>

	<footer>
		<slot name="footer" />
	</footer>
</section>

<style>
	.auth-form {
		max-width: 47.6rem;
		margin-inline: auto;
		padding: 4rem;
	}

	header {
		margin-bottom: 4rem;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 2.4rem;
	}

	.error {
		color: var(--red);
	}

	footer {
		margin-top: 2.4rem;
		text-align: center;
	}
</style>
