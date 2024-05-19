import React from 'react'

function TasksCard({
  name,
  id,
  comments,
  observers,
  executors,
  priority,
  startTime,
  deadLine,
}) {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">Название : {name}</h5>
        <p className="card-text"> Комментарии : {comments}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Наблюдатель : {observers}</li>
        <li className="list-group-item">Исполнитель : {executors}</li>
        <li className="list-group-item">Приоретет : {priority}</li>
      </ul>
      <div className="card-body">
        <a href="#" className="card-link">
          {startTime}
        </a>
        <a href="#" className="card-link">
          {deadLine}
        </a>
      </div>
    </div>
  )
}

export default TasksCard
