import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetTasksQuery } from '../../store/request/taskApi'
import styles from '../assets/static/PdfPage.module.css'

function Pdf() {
  const params = useParams()
  const { data = [] } = useGetTasksQuery(params.id)
  const [fast, setFast] = useState([])

  const tgUsers = [24055436, 5092708098]

  const botSend = () => {
    fetch('http://127.0.0.1:8000/send_message/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: tgUsers,
        text: 'Hello ребяталар',
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error))
  }

  return (
    <div className={styles['main']}>
      <h1>Информация</h1>

      <h2>
        Участники :
        {data.observers_profile?.map((item) => (
          <div> {item.first_name} </div>
        ))}
      </h2>
      <h1> {data.name}</h1>
      <button className="btn" onClick={botSend}>
        send message
      </button>
    </div>
  )
}

export { Pdf }
