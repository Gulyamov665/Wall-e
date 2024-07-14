import React, { useEffect, useState } from 'react'
import Main from '../layouts/Main'
import SettingsBar from '../layouts/SettingsBar'
import { useLazyGetTasksQuery } from '../../store/request/taskApi'
import { Link } from 'react-router-dom'

function TableV2() {
  const [load, results] = useLazyGetTasksQuery()
  const [page, setPage] = useState(1)

  useEffect(() => {
    load({ count: page })
  }, [page])

  const nextPage = () => {
    if (page < results.data?.pages) {
      setPage(page + 1)
    }
  }

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

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
                  <Link
                    to={`/task/${item.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    Открыть
                  </Link>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <div className="d-flex justify-content-center">
          <nav aria-label="Page navigation ">
            <ul className="pagination">
              <li
                className="page-item"
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                <a className="page-link" onClick={previousPage}>
                  Previous
                </a>
              </li>
              {/* {
                <li className="page-item">
                  <a className="page-link" href="#">
                    {results.data?.pages}
                  </a>
                </li>
              } */}
              <li
                className="page-item"
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                <a className="page-link" onClick={nextPage}>
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
