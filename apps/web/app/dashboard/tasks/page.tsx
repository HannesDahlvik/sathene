import { DashboardTimeline } from '../_components/Timeline'
import { DashboardTasksCreateTaskButton } from './_components/CreateTaskButton'
import { DashboardTasksTaskItem } from './_components/TaskItem'
import { CheckCheck } from 'lucide-react'
import { caller } from '~/lib/caller'

export default async function DashboardTasksPage() {
    const tasks = await caller.tasks.all()

    return (
        <div className="grid grid-cols-[1fr_400px] h-full">
            <div className="flex flex-col gap-4 p-8">
                <div className="inline-flex gap-8">
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

            <DashboardTimeline />
        </div>
    )
}
