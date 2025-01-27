import { getTask } from "@/actions/tasks"
import ReturnButton from "@/components/ReturnButton"
import TaskForm from "@/components/TaskForm"

const EditTask = async ({params} : { params: { id: number } }) => {
  const { id } = await params
  const task = await getTask(id)

  return (
    <div>
      <ReturnButton />
      <TaskForm task={task} />
    </div>
  )
}

export default EditTask
