<script lang="ts">
    import { type SortOrderEnum, type TaskList, type Tasks } from '@sathene/db'
    import { Button, DropdownMenu } from '@sathene/ui'

    import { closeAllAlerts, openAlert } from '$lib/alerts.svelte'
    import { api } from '$lib/api'
    import { DASHBOARD_TASKLIST_SORT_ORDERS } from '$lib/consts'
    import { openModal } from '$lib/modals.svelte'
    import { errorHandler } from '$lib/utils'
    import { CheckCheck, EllipsisVertical } from '@lucide/svelte'
    import { useQueryClient } from '@tanstack/svelte-query'

    import NewTask from '../../_modals/NewTask.svelte'
    import RenameTaskList from '../../_modals/RenameTaskList.svelte'
    import Task from './Task.svelte'

    interface Props {
        list: TaskList
        completedTasks: Tasks[]
        incompletedTasks: Tasks[]
    }

    let { list, completedTasks, incompletedTasks }: Props = $props()

    let queryClient = useQueryClient()
    let sortBy = $state<SortOrderEnum>('DATE')

    $effect(() => {
        sortBy = list.sortOrder
    })

    function handleSortOrderChange(value: SortOrderEnum) {
        api.task.list.edit
            .mutate({
                listId: list.id,
                sortOrder: value
            })
            .then(async () => {
                await queryClient.invalidateQueries({ queryKey: ['taskPage'] }).catch((err) => {
                    errorHandler(err)
                })
            })
            .catch((err) => {
                errorHandler(err)
            })

        sortBy = value
    }

    function handleRenameList() {
        openModal({
            modal: RenameTaskList,
            title: 'Rename List',
            modalProps: {
                listId: list.id,
                existingName: list.name
            }
        })
    }

    function handleDeleteList() {
        openAlert({
            title: 'Delete List',
            description: 'Are you sure you want to delete this list? This action cannot be undone.',
            labels: {
                action: 'Delete'
            },
            onConfirm: async () => {
                try {
                    closeAllAlerts()
                    await api.task.list.delete.mutate({ listId: list.id })
                    await queryClient.invalidateQueries({ queryKey: ['taskPage'] })
                } catch (err) {
                    errorHandler(err as Error)
                }
            }
        })
    }
</script>

<div class="bg-accent flex w-md flex-col rounded border p-3">
    <div class="flex items-center justify-between">
        <p>{list.name}</p>

        <div class="flex items-center space-x-2">
            <Button
                size="sm"
                variant="outline"
                onclick={() =>
                    openModal({
                        modal: NewTask,
                        title: 'New Task',
                        modalProps: {
                            listId: list.id
                        }
                    })}
            >
                New task
            </Button>

            <DropdownMenu.Root>
                <DropdownMenu.Trigger class="cursor-pointer">
                    <EllipsisVertical size={16} />
                </DropdownMenu.Trigger>

                <DropdownMenu.Content align="end">
                    <DropdownMenu.Group>
                        <DropdownMenu.Label>Sort by</DropdownMenu.Label>
                        {#each DASHBOARD_TASKLIST_SORT_ORDERS as item}
                            <DropdownMenu.CheckboxItem
                                checked={sortBy === item.value}
                                onCheckedChange={() => handleSortOrderChange(item.value)}
                            >
                                {item.label}
                            </DropdownMenu.CheckboxItem>
                        {/each}
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item onclick={handleRenameList}>Rename list</DropdownMenu.Item
                        >
                        <DropdownMenu.Item onclick={handleDeleteList}>Delete list</DropdownMenu.Item
                        >
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item disabled>Delete all completed tasks</DropdownMenu.Item>
                    </DropdownMenu.Group>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>
    </div>

    {#if incompletedTasks.length === 0 && completedTasks.length === 0}
        <div class="flex flex-col items-center justify-center py-16">
            <CheckCheck />
            <p class="mt-4 text-lg">No tasks yet</p>
        </div>
    {:else if incompletedTasks.length !== 0}
        <div class="mt-4">
            {#each incompletedTasks as task}
                <Task {task} />
            {/each}
        </div>
    {/if}

    {#if completedTasks.length !== 0}
        <hr class="my-2" />

        <div>
            {#each completedTasks as task}
                <Task {task} />
            {/each}
        </div>
    {/if}
</div>
