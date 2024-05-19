import React from 'react'

function TaskDetailForm({ register, handleSubmit, addComments }) {
  return (
    <div className="container container-form w-50">
      <form onSubmit={handleSubmit(addComments)}>
        <input
          className="form-control"
          type="text"
          {...register('comment')}
          placeholder="Комментарий"
        />
        <input
          className="form-control"
          type="file"
          multiple
          accept="image/png, image/jpg"
          {...register('uploaded_images')}
        />
        <button className="btn">Отправить</button>
      </form>
    </div>
  )
}

export { TaskDetailForm }
