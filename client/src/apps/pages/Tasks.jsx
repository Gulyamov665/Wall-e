import React from 'react'
import { useGetTasksQuery } from '../../store/request/taskApi'
import Main from '../layouts/Main'
import SettingsBar from '../layouts/SettingsBar'
import DataTable from '../components/Table'

function Tasks() {
  const { data: tasks = [] } = useGetTasksQuery()
  return (
    <Main>
      <SettingsBar>Hello</SettingsBar>
      <div className="container w-50">
        <DataTable tasks={tasks.results} />
      </div>
    </Main>
  )
}

export { Tasks }
