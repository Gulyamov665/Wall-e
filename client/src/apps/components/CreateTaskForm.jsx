import React from 'react'

export default function CreateTaskForm({
  statuses,
  users,
  handleLoad,
  register,
  handleSubmit,
}) {
  return (
    <div className="container container-form w-50">
      <h4 className="pt-6 mb-6">Создать Задачу</h4>
      <form className="container" onSubmit={handleSubmit(handleLoad)}>
        <div className="mb-4">
          <input
            className="form-control"
            id="task-name"
            placeholder="Название"
            type="text"
            {...register('name')}
            required
          />
        </div>

        <div className="mb-4">
          <textarea
          placeholder='Комментарий'
            className="form-control"
            {...register('comments')}
          ></textarea>
        </div>

        <div className="mb-4">
          <input
            className="form-control"
            type="file"
            multiple
            accept="image/png, image/jpg"
            {...register('uploaded_images')}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="">classification</label>
          <input
            className="from-control"
            type="number"
            {...register('classification')}
          />
        </div>
        <button className="btn btn-warning" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}
