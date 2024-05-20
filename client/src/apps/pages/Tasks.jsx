import React from 'react'
import { useGetTasksQuery } from '../../store/request/taskApi'
import Main from '../layouts/Main'
import SettingsBar from '../layouts/SettingsBar'
import DataTable from '../components/Table'
import styles from '../assets/static/Task.module.css'

function Tasks() {
  const { data: tasks = [] } = useGetTasksQuery()
  return (
    <Main>
      <SettingsBar>Hello</SettingsBar>
      <div className={styles.containerTask}>
        <DataTable className="has-background-dark" tasks={tasks.results} />
      </div>
    </Main>
  )
}

export { Tasks }
