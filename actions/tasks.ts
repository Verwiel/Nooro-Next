'use server'

import { error } from 'console'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export async function getTasks() {
  const data = await fetch(`${process.env.BASE_API_ROUTE}/api/v1/tasks`)
  const tasks = await data.json()
  return tasks
}

export async function getTask(id: number) {
  const data = await fetch(`${process.env.BASE_API_ROUTE}/api/v1/tasks/${id}`)
  const task = await data.json()
  return task
}

const SubmitTaskSchema = z.object({
  title: z.string(),
  color: z.string()
})

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

  const res = await fetch(`${process.env.BASE_API_ROUTE}/api/v1/tasks`, {
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
  } else {
    console.error('Failed to create task.')
    throw error('Unable to create task.')
  }
}

export async function finishTask(id: number, completed: boolean) {
  const data = {
    id: id,
    completed: !completed
  }

  const res = await fetch(`${process.env.BASE_API_ROUTE}/api/v1/tasks/${id}`, {
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

  const res = await fetch(`${process.env.BASE_API_ROUTE}/api/v1/tasks/${id}`, {
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
  } else {
    console.error('Failed to update task.')
    throw error('Unable to update task.')
  }
}

export async function deleteTask(id: number) {
  const res = await fetch(`${process.env.BASE_API_ROUTE}/api/v1/tasks/${id}`, {
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
