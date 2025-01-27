'use server'

import { error } from 'console'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

// GET MANY
export async function getTasks() {
  const data = await fetch(`${process.env.BASE_API_ROUTE}/tasks`)
  const tasks = await data.json()
  return tasks
}

// GET ONE
export async function getTask(id: number) {
  const data = await fetch(`${process.env.BASE_API_ROUTE}/tasks/${id}`)
  const task = await data.json()
  return task
}

const SubmitTaskSchema = z.object({
  title: z.string(),
  color: z.string()
})

// CREATE
export async function createTask(formData: FormData) {
  const validatedFields = SubmitTaskSchema.safeParse({
    title: formData.get("title"),
    color: formData.get("color")
  })

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to give create task.',
    }
  }

  const res = await fetch(`${process.env.BASE_API_ROUTE}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validatedFields.data),
  })
  
  if (res.ok) {
    const newTask = await res.json()
    console.log('task created:', newTask)
    revalidatePath('/')
    redirect('/')
  } else if(res.status === 409){
    const newTask = await res.json()
    return {
      error: true,
      msg: newTask.msg
    }
  } else {
    return {
      error: true,
      msg: "Something went wrong with our servers."
    }
  }
}

// UPDATE COMPLETED STATUS
export async function finishTask(id: number, completed: boolean) {
  const data = {
    id: id,
    completed: !completed
  }

  const res = await fetch(`${process.env.BASE_API_ROUTE}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (res.ok) {
    const updatedTask= await res.json()
    console.log('task completed:', updatedTask)
    revalidatePath('/')
  } else {
    console.error('Failed to complete task.')
    throw error('Unable to complete task.')
  }
}

// UPDATE
export async function updateTask(id: number, formData: FormData) {
  const validatedFields = SubmitTaskSchema.safeParse({
    title: formData.get("title"),
    color: formData.get("color")
  })

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to give create task.',
    }
  }

  const res = await fetch(`${process.env.BASE_API_ROUTE}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validatedFields.data),
  })

  if (res.ok) {
    const updatedTask = await res.json()
    console.log('task updated:', updatedTask)
    revalidatePath('/')
    redirect('/')
  } else if(res.status === 409){
    const updatedTask = await res.json()
    return {
      error: true,
      msg: updatedTask.msg
    }
  } else {
    return {
      error: true,
      msg: "Something went wrong with our servers."
    }
  }
}

// DELETE
export async function deleteTask(id: number) {
  const res = await fetch(`${process.env.BASE_API_ROUTE}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (res.ok) {
    const deletedTask = await res.json()
    console.log('task deleted:', deletedTask)
    revalidatePath('/')
  } else {
    console.error('Failed to delete task.')
    throw error('Unable to delete task.')
  }
}
