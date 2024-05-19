import React from 'react'
import Main from '../layouts/Main'
import CreateTaskForm from '../components/CreateTaskForm'
import {
  useGetTasksStatusQuery,
  useAddTaskMutation,
} from '../../store/request/taskApi'
import { useGetUsersQuery } from '../../store/request/usersApi'
import { useForm } from 'react-hook-form'
import SettingsBar from '../layouts/SettingsBar'
import { TaskExtraOptions } from '../components/TaskExtraOptions'

export default function CreateTask() {
  const { data: statuses } = useGetTasksStatusQuery()
  const { data: users } = useGetUsersQuery()
  const [addTask] = useAddTaskMutation()
  const { register, handleSubmit, reset } = useForm()

  const handleLoad = async (data) => {
    let formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'uploaded_images' || key === 'observers') {
        ;[...value].forEach((item) => formData.append(key, item))
        return
      }
      formData.append(key, value)
    })

    await addTask(formData)
    reset()
    reset({
      start_time: '',
      dead_line: '',
      observers: '',
      executer: '',
      status: '',
      priority: '',
    })
  }
  return (
    <Main>
      <SettingsBar>
        <TaskExtraOptions
          register={register}
          statuses={statuses}
          users={users}
        />
      </SettingsBar>
      <CreateTaskForm
        handleLoad={handleLoad}
        register={register}
        handleSubmit={handleSubmit}
      />
    </Main>
  )
}
