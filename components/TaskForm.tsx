'use client'

import { createTask, updateTask } from "@/actions/tasks"
import { Task as TaskType} from "@/types/types"
import Image from "next/image"
import { useState, FormEvent } from "react"

const TaskForm = ({ task } : { task: TaskType | null }) => {
  const isNewForm = !task
  const defaultColor = isNewForm ? "" : task.color
  const [selectedColor, setSelectedColor] = useState(defaultColor)

  const colors = [
    {
      name: 'Red',
      value: "#FF3B30"
    },
    {
      name: 'Orange',
      value: "#FF9500"
    },
    {
      name: 'Yellow',
      value: "#FFCC00"
    },
    {
      name: 'Green',
      value: "#34C759"
    },
    {
      name: 'Blue',
      value: "#007AFF"
    },
    {
      name: 'Indigo',
      value: "#5856D6"
    },
    {
      name: 'Purple',
      value: "#AF52DE"
    },
    {
      name: 'Pink',
      value: "#FF2D55"
    },
    {
      name: 'Brown',
      value: "#A2845E"
    },
  ]

  const colorMap = colors.map(color => {
    return (
      <div 
        key={color.name} 
        className={`w-14 h-14 rounded-full mr-4 border-2 cursor-pointer hover:border-white ${color.value === selectedColor ? "border-white" : "border-transparent"}`} 
        style={{backgroundColor: color.value}}
        onClick={() => setSelectedColor(color.value)}
      >
      </div>
    )
  })

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    if(isNewForm){
      createTask(formData)
    } else {
      console.log(task.id)
      updateTask(task.id, formData)
    }
  }

  return (
    <form onSubmit={submitForm} className='mt-10'>
      {/* Hidden to use FormData on submit. */}

      <label htmlFor="title">
        <p className="text-primary text-sm font-bold mb-3">Title</p>
        <input 
          type="text" 
          className="w-full rounded-lg p-3 bg-[#333333] text-[#F2F2F2] mb-8"
          name="title" 
          id="title" 
          placeholder={isNewForm ? "Ex: Brushing your teeth" : task.title}
          defaultValue={isNewForm ? "" : task.title}
          required
        />
      </label>

      <label htmlFor="color-pick">
        <p className="text-primary text-sm font-bold mb-3">Color</p>
        <div className='flex'>
          {colorMap}
        </div>
      </label>

      {/* Hidden to use FormData on submit. */}
      <input type="hidden" name="color" value={selectedColor} />

      <button type="submit" className="flex items-center justify-center w-full mt-14 text-[#F2F2F2] font-bold bg-[#1E6F9F] rounded-lg p-4 text-sm">
        {isNewForm ? "Add Task" : "Save"}
        <Image
          src={isNewForm ? "/static/plus.svg" : "/static/check-bold.svg"}
          width={16}
          height={16}
          alt="submit icon"
          className="ml-2"
        />
      </button>
    </form>
  )
}

export default TaskForm
