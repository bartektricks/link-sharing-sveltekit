<script lang="ts">
	import AuthForm, { type Field } from '../AuthForm.svelte';
	import type { ActionData } from './$types';
	import { MIN_PASS_LENGTH } from './_registerSchema';

	export let form: ActionData;

	const fields = [
		{
			label: 'Email address',
			name: 'email',
			type: 'email',
			value: form?.fields?.email ?? '',
			placeholder: 'e.g. alex@email.com',
			required: true,
		},
		{
			label: 'Create password',
			name: 'password',
			type: 'password',
			value: form?.fields?.password ?? '',
			placeholder: `At least ${MIN_PASS_LENGTH} characters`,
			required: true,
		},
		{
			label: 'Confirm password',
			name: 'confirmPassword',
			type: 'password',
			value: form?.fields?.confirmPassword ?? '',
			placeholder: `At least ${MIN_PASS_LENGTH} characters`,
			required: true,
		},
	] satisfies Field[];
</script>

<AuthForm
	title="Create account"
	subtitle="Let’s get you started sharing your links!"
	submitText="Create new account"
	{fields}
	errors={form?.fieldErrors}
>
	<p class="body-s" slot="additional-fields">Password must contain at least 8 characters</p>
	<svelte:fragment slot="footer">
		<p>Already have an account? <a href="/login">Login</a></p>
	</svelte:fragment>
</AuthForm>
