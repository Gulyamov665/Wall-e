import React from 'react'

const ClassificationForm = ({
  handleSubmit,
  register,
  createClassification,
}) => {
  return (
    <form onSubmit={handleSubmit(createClassification)}>
      <p>
        <label htmlFor="">Название</label>
        <input type="text" {...register('name')} required />
      </p>

      <p>
        <label htmlFor="">Доступность</label>
        <input type="checkbox" {...register('availability')} />
      </p>

      <button className="btn btn-warning" type="submit">
        Отправить
      </button>
    </form>
  )
}

export { ClassificationForm }

// class Classification(BaseModel):
//     name = models.CharField(max_length=255, unique=True)
//     availability = models.BooleanField(default=True)
