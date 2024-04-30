<script context="module" lang="ts">
	import { enhance } from '$app/forms';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import EmailIcon from '$icons/icon-email.svelte';
	import PasswordIcon from '$icons/icon-password.svelte';

	import Input from '$components/Input.svelte';

	function getIcon(name: string | null | undefined) {
		switch (name) {
			case 'email':
				return EmailIcon;
			case 'password':
			case 'confirmPassword':
				return PasswordIcon;
			default:
				return undefined;
		}
	}

	export type Field = {
		label: string;
	} & HTMLInputAttributes;
</script>

<script lang="ts">
	export let title: string;
	export let subtitle: string;
	export let fields: Field[];
	export let submitText: string;
	export let errors: Record<string, string[]> | undefined = {};
</script>

<section class="auth-form">
	<header>
		<h1 class="heading-m">{title}</h1>
		<p class="body-m">{subtitle}</p>
	</header>

	<form method="POST" use:enhance>
		{#each fields as { label, ...field } (field.name)}
			{@const error = field.name && errors?.[field.name]?.join(', ')}
			<Input {field} {label} {error} icon={getIcon(field.name)}></Input>
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

	footer {
		margin-top: 2.4rem;
		text-align: center;
	}
</style>
