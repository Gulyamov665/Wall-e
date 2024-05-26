import React from 'react'

function TaskDetailForm({ register, handleSubmit, addComments }) {
  return (
    <div className="container w-50">
      <form onSubmit={handleSubmit(addComments)}>
        <textarea
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
        <button className="btn btn-warning m-5">Отправить</button>
      </form>
    </div>
  )
}

export { TaskDetailForm }
