import { DashboardTasksTaskItem } from '../_components/TaskItem'
import { CheckCheck } from 'lucide-react'
import { caller } from '~/lib/caller'

interface Props {
    params: {
        listId: string
    }
}

export default async function DashboardTasksListIdPage({ params }: Props) {
    const tasks = await caller.task.all({
        listId: params.listId
    })

    return (
        <div className="flex flex-col gap-2">
            {tasks.length === 0 && (
                <div className="flex flex-col justify-center items-center gap-2 mt-8">
                    <CheckCheck className="text-muted-foreground" size={64} />
                    <p className="text-center text-xl">You have not created any tasks!</p>
                </div>
            )}

            {tasks.map((task) => (
                <DashboardTasksTaskItem task={task} key={task.id} />
            ))}
        </div>
    )
}
