import React from 'react'
import Main from '../layouts/Main'
import SettingsBar from '../layouts/SettingsBar'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetTasksQuery } from '../../store/request/taskApi'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'

function TaskDetail() {
  const params = useParams()
  const { data = [] } = useGetTasksQuery(params.id)
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  return (
    <Main className="text-start">
      <div></div>
      <button className="btn " onClick={() => navigate(-1)}>
        Back
      </button>
      <SettingsBar>
        <p>
          Начало:{' '}
          {data.start_time && format(new Date(data.start_time), 'dd.MM.yy')}
        </p>
        <p>
          Dead Line:{' '}
          {data.dead_line && format(new Date(data.dead_line), 'dd.MM.yy')}
        </p>
      </SettingsBar>
      <p>Название : {data.name}</p>

      {data &&
        data.task_images?.map((image) => (
          <img
            width={200}
            height={200}
            key={image.id}
            src={image.image}
            alt={image.image}
          />
        ))}

      <p>Комментарий : {data.comments}</p>
      <p>
        {data.comment?.map((item) => (
          <p key={item.id}>{item} </p>
        ))}
      </p>
    </Main>
  )
}

export { TaskDetail }
