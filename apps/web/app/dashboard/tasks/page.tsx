import { DashboardTasksCreateTaskButton } from './_components/CreateTaskButton'
import { DashboardTasksTaskItem } from './_components/TaskItem'
import { CheckCheck } from 'lucide-react'
import { caller } from '~/lib/caller'

export default async function DashboardTasksPage() {
    const tasks = await caller.tasks.all()

    return (
        <div className="flex flex-col gap-4 p-8">
            <div className="flex justify-between items-center gap-8 bg-accent p-4 w-60 border rounded-xl">
                <h2>Tasks</h2>

                <DashboardTasksCreateTaskButton />
            </div>

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
        </div>
    )
}
