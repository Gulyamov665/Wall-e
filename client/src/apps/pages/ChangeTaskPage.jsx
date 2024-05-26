import React, { useEffect } from 'react'
import CreateTaskForm from '../components/CreateTaskForm'
import Main from '../layouts/Main'
import SettingsBar from '../layouts/SettingsBar'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useGetTasksQuery,
  useGetTasksStatusQuery,
  useUpdateTaskMutation,
} from '../../store/request/taskApi'
import { addFormData } from '../utils/formData'
import { useGetUsersQuery } from '../../store/request/usersApi'
import { TaskExtraOptions } from '../components/TaskExtraOptions'

function ChangeTaskPage() {
  const params = useParams()
  const { data: taskQuery } = useGetTasksQuery(params.id)
  const [updateTask] = useUpdateTaskMutation()
  const { data: statuses } = useGetTasksStatusQuery()
  const { data: users } = useGetUsersQuery()
  const navigate = useNavigate()
  const { handleSubmit, register, reset } = useForm({
    defaultValues: taskQuery,
  })

  useEffect(() => {
    if (taskQuery) {
      reset(taskQuery)
    }
  }, [taskQuery, reset])

  const handleUpdateTask = async (data) => {
    const formData = addFormData(data)
    await updateTask({ body: formData, id: params.id })
    navigate(`/task/${params.id}`)
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
      <button className="btn btn-warning" onClick={() => navigate(-1)}>Назад</button>
      <CreateTaskForm
        handleLoad={handleUpdateTask}
        handleSubmit={handleSubmit}
        register={register}
        taskQuery={taskQuery}
      />
    </Main>
  )
}

export default ChangeTaskPage
