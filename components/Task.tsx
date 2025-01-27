'use client'

import { finishTask, deleteTask } from "@/actions/tasks"
import Image from "next/image"
import Link from "next/link"

const Task = ({ id, title, completed }: {
  id: number,
  title: string,
  completed: boolean
}) => {

  const deletePrompt = () => {
    if(!confirm(`Are you sure you want to delete the task: "${title}"?`)) return;
    deleteTask(id)
  }

  return (
    <div className="flex justify-between items-start bg-[#262626] p-4 mb-2 rounded-lg border-2 border-[#333333] text-[#F2F2F2] text-sm">
      <button onClick={() => finishTask(id, completed)}>
        <Image
          src={completed ? "/static/check-checked.svg" : "/static/check-empty.svg"}
          width={24}
          height={24}
          alt="checkbox"
        />
      </button>

      <Link href={`/edit/${id}`} className="flex-1 px-2 my-auto">
        {title}
      </Link>

      <button onClick={deletePrompt}>
        <Image
          src="/static/trash.svg"
          width={24}
          height={24}
          alt="checkbox"
        />
      </button>
    </div>
  )
}

export default Task
