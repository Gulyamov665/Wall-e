import React from 'react'
import Main from '../layouts/Main'
import { useForm } from 'react-hook-form'
import { ClassificationForm } from '../components/ClassificationForm'
import { useAddClassificationMutation } from '../../store/request/classificationApi'

const ClassificationPage = () => {
  const { register, handleSubmit, reset } = useForm()
  const [addClassification] = useAddClassificationMutation()

  const createClassification = async (data) => {
    console.log(data)

    await addClassification(data)
    reset()
  }

  return (
    <Main>
      <div className="container">
        <h4>Создать очередь</h4>
        <ClassificationForm
          register={register}
          handleSubmit={handleSubmit}
          createClassification={createClassification}
        />
      </div>
    </Main>
  )
}

export { ClassificationPage }
