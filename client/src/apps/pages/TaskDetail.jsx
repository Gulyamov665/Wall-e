import React, { useRef } from 'react'
import Main from '../layouts/Main'
import SettingsBar from '../layouts/SettingsBar'
import { useNavigate, useParams, Link } from 'react-router-dom'
import {
  useDeleteTaskMutation,
  useGetTasksQuery,
} from '../../store/request/taskApi'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { TaskDetailForm } from '../components/TaskDetailForm'
import {
  useAddCommentsMutation,
  useGetCommentsQuery,
} from '../../store/request/commentsApi'
import styles from '../assets/static/TaskDetail.module.css'
import Gallery from '../components/Gallery'
import { addFormData } from '../utils/formData'
import QuiltedImageList from '../components/ImageList'
import { usePDF } from 'react-to-pdf'
import Pptx from '../components/Pptx'

function TaskDetail() {
  const params = useParams()
  const { data = [] } = useGetTasksQuery({ id: params.id })
  const [addComment] = useAddCommentsMutation()
  const { data: commentsData } = useGetCommentsQuery(params.id)
  const [deleteTask] = useDeleteTaskMutation()
  const { register, handleSubmit, reset } = useForm()
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' })
  const navigate = useNavigate()

  const addComments = async (data) => {
    const formData = addFormData(data, params)

    await addComment(formData)
    reset()
  }

  const handleDeleteTask = async () => {
    const confirm = window.confirm('вы действительно хотите удалить данные ?')

    if (confirm) {
      await deleteTask(params.id)
      navigate('/tasks')
    }
  }

  console.log(data?.task_images)
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
        <div className="d-flex justify-content-between">
          <button
            className={`${styles['btn']} btn`}
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <div>
            <button
              className={`${styles['btn-change']} btn btn-warning`}
              onClick={() => {
                toPDF()
              }}
            >
              PDF
            </button>

            <Pptx
              title={data.name}
              mainComment={data.comments}
              comments={commentsData}
            />

            <button className={styles['btn-delete']} onClick={handleDeleteTask}>
              Удалить
            </button>
            <Link to={`/task-change/${params.id}`}>
              <button
                className={`${styles['btn-change']} btn btn-primary`}
                onClick={() => {}}
              >
                Изменить
              </button>
            </Link>
          </div>
        </div>

        {/* ----Intro---- */}
        <div ref={targetRef}>
          <div className={styles['task-detail-info']}>
            <h1>{data.name}</h1>
            <hr />
            <h3 className={styles['intro-comment']}>{data.comments}</h3>

            <div className="d-flex align-items-center">
              <QuiltedImageList data={data?.task_images} />
              <div style={{ margin: '0 auto', textAlign: 'center' }}>
                <img
                  style={{ borderRadius: 50 }}
                  width={100}
                  height={100}
                  src={data.executor_profile?.avatar}
                  alt=""
                />
                <div
                  style={{
                    backgroundColor: 'black',
                    padding: '10% 20%',
                    borderRadius: 20,
                  }}
                >
                  <p>
                    <b style={{ color: 'white' }}>
                      {data.executor_profile?.first_name}
                    </b>{' '}
                  </p>
                  <p>
                    <b style={{ color: 'white' }}>
                      {data.executor_profile?.last_name}
                    </b>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          {commentsData &&
            commentsData?.map((comment) => (
              <div key={comment.id} className={styles['card']}>
                <div className={styles['card-header']}>
                  <div>
                    {comment.creator && (
                      <img
                        className={styles['profile-pic']}
                        src={comment.creator?.avatar}
                        alt=""
                      />
                    )}
                  </div>

                  <div className={styles['user-info']}>
                    <h3>
                      {comment.creator?.first_name} {comment.creator?.last_name}
                    </h3>
                    <p>
                      Создан :{' '}
                      {format(new Date(comment.created_at), 'dd.MM.yy HH:mm')}
                    </p>
                  </div>
                </div>
                <div className={styles['card-content']}>
                  <p>1. Файзи Узбегим.</p>
                  <p>{comment.comment}</p>
                  <p className={styles['edited']}>
                    Отредактировал Умид Бомурадов 19 мая, 17:36
                  </p>
                </div>
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
