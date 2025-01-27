import ReturnButton from "@/components/ReturnButton"
import TaskForm from "@/components/TaskForm"

const CreateTask = () => {
  return (
    <div>
      <ReturnButton />
      <TaskForm task={null} />
    </div>
  )
}

export default CreateTask
