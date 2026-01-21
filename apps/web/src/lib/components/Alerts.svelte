<script lang="ts">
    import { AlertDialog } from '@sathene/ui'

    import { type AlertSettings, getAlerts } from '$lib/alerts.svelte'

    let alerts: AlertSettings[] = $state([])
    $effect(() => {
        alerts = getAlerts()
    })
</script>

{#each alerts as alert}
    <AlertDialog.Root open={alert.open} onOpenChange={alert.onOpenChange}>
        <AlertDialog.Content>
            <AlertDialog.Header>
                <AlertDialog.Title>{alert.title}</AlertDialog.Title>
                {#if alert.description}
                    <AlertDialog.Description>
                        {alert.description}
                    </AlertDialog.Description>
                {/if}
            </AlertDialog.Header>

            <AlertDialog.Footer>
                <AlertDialog.Cancel onclick={alert.onCancel}
                    >{alert.labels?.cancel || 'Cancel'}</AlertDialog.Cancel
                >
                <AlertDialog.Action onclick={alert.onConfirm}
                    >{alert.labels?.action || 'Continue'}</AlertDialog.Action
                >
            </AlertDialog.Footer>
        </AlertDialog.Content>
    </AlertDialog.Root>
{/each}
