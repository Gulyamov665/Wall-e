import React from 'react'
import Main from '../layouts/Main'
import SettingsBar from '../layouts/SettingsBar'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetTaskByIdQuery } from '../../store/request/taskApi'
import { format } from 'date-fns'

function TaskDetail() {
  const params = useParams()
  const navigate = useNavigate()
  const { data = [] } = useGetTaskByIdQuery(params.id)

  console.log(data)
  return (
    <Main>
      <button className="btn" onClick={() => navigate(-1)}>
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
