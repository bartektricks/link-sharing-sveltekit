<script lang="ts">
	import AuthForm, { type Field } from '../AuthForm.svelte';

	const fields = [
		{
			label: 'Email address',
			name: 'email',
			type: 'email',
			placeholder: 'e.g. alex@email.com',
			required: true,
		},
		{
			label: 'Create password',
			name: 'password',
			type: 'password',
			placeholder: 'At least 8 characters',
			required: true,
		},
		{
			label: 'Confirm password',
			name: 'confirmPassword',
			type: 'password',
			placeholder: 'At least 8 characters',
			required: true,
		},
	] satisfies Field[];
</script>

<AuthForm
	title="Create account"
	subtitle="Let’s get you started sharing your links!"
	submitText="Create new account"
	{fields}
>
	<p class="body-s" slot="additional-fields">Password must contain at least 8 characters</p>
	<svelte:fragment slot="footer">
		<p>Already have an account? <a href="/login">Login</a></p>
	</svelte:fragment>
</AuthForm>
