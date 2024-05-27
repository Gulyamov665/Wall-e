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
import { addFormData } from '../utils/formData'
import { useSendMessageMutation } from '../../store/request/notificationApi'

export default function CreateTask() {
  const { data: statuses } = useGetTasksStatusQuery()
  const { data: users } = useGetUsersQuery()
  const [addTask, { data: addedTask }] = useAddTaskMutation()
  const [sendNotification] = useSendMessageMutation()
  const { register, handleSubmit, reset } = useForm()

  const handleLoad = async (data) => {
    const formData = addFormData(data)

    await addTask(formData)
      .then((res) => sendNotification(res.data))
      .catch((err) => console.log(err))
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
