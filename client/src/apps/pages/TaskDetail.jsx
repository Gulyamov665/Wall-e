import React from 'react'
import Main from '../layouts/Main'
import SettingsBar from '../layouts/SettingsBar'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetTasksQuery } from '../../store/request/taskApi'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { TaskDetailForm } from '../components/TaskDetailForm'
import {
  useAddCommentsMutation,
  useGetCommentsQuery,
} from '../../store/request/commentsApi'
import styles from '../assets/static/TaskDetail.module.css'
import Gallery from '../components/Gallery'

function TaskDetail() {
  const params = useParams()
  const { data = [] } = useGetTasksQuery(params.id)
  const [addComment] = useAddCommentsMutation()
  const { data: commentsData } = useGetCommentsQuery(params.id)
  const { register, handleSubmit, reset } = useForm()
  const navigate = useNavigate()

  const addComments = async (data) => {
    let formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'uploaded_images') {
        ;[...value].forEach((item) => formData.append(key, item))
        return
      }
      formData.append(key, value)
      formData.append('task', params.id)
    })

    await addComment(formData)
    reset()
  }

  return (
    <Main>
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
      <div className={styles.containerTaskDetail}>
        <button className="btn " onClick={() => navigate(-1)}>
          Back
        </button>

        <p>Название : {data.name}</p>

        {data.task_images?.map((image) => (
          <img
            width={200}
            height={200}
            key={image.id}
            src={image.image}
            alt={image.image}
          />
        ))}

        <p>Комментарий : {data.comments}</p>
        <div>
          {commentsData &&
            commentsData?.map((comment) => (
              <div key={comment.id}>
                <p>{comment.comment}</p>

                {/* {comment.comment_image.map((image) => (
                <img
                  key={image.id}
                  width={200}
                  height={200}
                  src={image.image}
                  alt={image.task}
                />
            ))} */}
                <Gallery data={comment.comment_image} />
              </div>
            ))}
        </div>

        <TaskDetailForm
          register={register}
          handleSubmit={handleSubmit}
          addComments={addComments}
        />
      </div>
    </Main>
  )
}

export { TaskDetail }
