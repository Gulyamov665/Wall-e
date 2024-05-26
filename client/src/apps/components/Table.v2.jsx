import React, { useEffect } from 'react'
import Main from '../layouts/Main'
import SettingsBar from '../layouts/SettingsBar'
import {
  useGetTasksQuery,
  useLazyGetTasksQuery,
} from '../../store/request/taskApi'
import { Link } from 'react-router-dom'

function TableV2() {
  const [load, results] = useLazyGetTasksQuery()
  const { data: tasks = [] } = useGetTasksQuery()

  useEffect(() => {
    load()
  }, [])

  console.log(results)

  return (
    <Main>
      <SettingsBar>hello</SettingsBar>
      <div className="table2">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">id</th>
              <th scope="col">Классификация</th>
              <th scope="col">Название</th>
              <th scope="col">Дата</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {results.data?.results.map((item, index) => (
            <tbody key={item.id}>
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{item.id}</td>
                <td>{item.classification_name}</td>
                <td>{item.name}</td>
                <td>{item.created_at}</td>
                <td>
                  <Link onClick={() => load({ page: 'page222' })}>
                    Изменить
                  </Link>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <div className="d-flex justify-content-center">
          <nav aria-label="Page navigation ">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#">
                  Previous
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  1
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  2
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  3
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Main>
  )
}

export { TableV2 }
