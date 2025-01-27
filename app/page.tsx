import Counter from "@/components/Counter"
import CreateTaskButton from "@/components/CreateTaskButton"
import Task from "@/components/Task"
import Image from "next/image"
import { Task as TaskType} from "@/types/types"
import { getTasks } from "@/actions/tasks"

export default async function Home() {
  const tasks = await getTasks()

  const completed = tasks.filter((task: TaskType) => task.completed).length
  const incomplete = tasks.filter((task: TaskType) => !task.completed).length

  const taskMap = tasks.map((task: TaskType) => (
    <Task key={task.id} id={task.id} title={task.title} completed={task.completed} />
  ))

  return (
    <div className="">
      <CreateTaskButton />

      <div className="mt-16 mb-6 flex justify-between text-red-100">
        <div className="flex justify-center h-full">
          <p className="text-primary text-sm font-bold align-baseline my-auto">Tasks</p>
          <Counter value={incomplete} total={tasks.length} isCompletedList={false} />
        </div>
        <div className="flex justify-center">
          <p className="text-secondary text-sm font-bold my-auto">Completed</p>
          <Counter value={completed} total={tasks.length} isCompletedList={true} />
        </div>
      </div>
      {tasks.length > 0 ?
        <>{taskMap}</>
        :
        <div className="flex flex-col justify-center items-center text-[#808080] text-base border-t-2 border-[#333333]">
          <Image 
            src="/static/clipboard.svg"
            width={56}
            height={56}
            alt="Clipboard"
            className="mt-16"
          />
          <strong className="mb-4 mt-6">You don't have any tasks registered yet</strong>
          <p>Create tasks and organize your to-do items.</p>
        </div>
      }
    </div>
  )
}
