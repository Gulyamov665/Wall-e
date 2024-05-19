import React from 'react'

function TaskExtraOptions({ register, statuses, users }) {
  return (
    <>
      <div className="mb-4">
        <label className="" htmlFor="">
          Начало
          <input
            className="form-control"
            type="date"
            {...register('start_time')}
          />
        </label>
        <label className="ms-2" htmlFor="">
          Dead line
          <input
            className="form-control"
            placeholder=""
            type="date"
            {...register('dead_line')}
          />
        </label>
      </div>

      <div className="mb-4">
        <select
          className="form-control"
          defaultValue={'status'}
          type="select"
          {...register('status')}
        >
          <option value="" hidden>
            Статус
          </option>
          {statuses &&
            statuses.status_choices?.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
        </select>
      </div>

      <div className="mb-4">
        <select
          className="form-control"
          defaultValue={'выбрать'}
          type="select"
          {...register('executor')}
        >
          <option value="" hidden>
            Исполнитель
          </option>
          {users &&
            users?.map((item, index) => (
              <option key={index} value={item.user}>
                {item.first_name} {item.last_name}
              </option>
            ))}
        </select>
      </div>

      <div className="mb-4">
        <select
          className="form-control"
          type="select"
          multiple
          {...register('observers')}
        >
          {users &&
            users?.map((item, index) => (
              <option key={index} value={Number(item.user)}>
                {item.first_name} {item.last_name}
              </option>
            ))}
        </select>
      </div>

      <div className="mb-4">
        <select
          className="form-control"
          defaultValue={'priority'}
          type="select"
          {...register('priority')}
        >
          <option value="" hidden>
            Приоритет
          </option>
          {statuses &&
            statuses.priority_choices?.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
        </select>
      </div>
    </>
  )
}

export { TaskExtraOptions }
