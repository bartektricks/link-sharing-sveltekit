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
			label: 'Password',
			name: 'password',
			type: 'password',
			placeholder: 'Enter your password',
			required: true,
		},
	] satisfies Field[];
</script>

<AuthForm
	title="Login"
	subtitle="Add your details below to get back into the app"
	{fields}
	submitText="Login"
>
	<svelte:fragment slot="footer">
		<p>Don't have an account? <a href="/register">Create account</a></p>
	</svelte:fragment>
</AuthForm>
