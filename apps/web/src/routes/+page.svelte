<script lang="ts">
    import { Button } from '@sathene/ui'

    import { authClient } from '$lib/api'

    const auth = authClient.useSession()
</script>

<div class="space-y-2 p-12">
    <h1>Sathene web</h1>

    <Button href="/dashboard">Dashboard</Button>
    {#if !$auth.data?.user}
        <Button href="/signin">Sign in</Button>
        <Button href="/signup">Signup</Button>
    {/if}
</div>
