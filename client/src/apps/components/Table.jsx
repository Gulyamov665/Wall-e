import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'classification_name', headerName: 'Classification', width: 200 },
  { field: 'name', headerName: 'name', width: 230 },

  {
    field: 'created_at',
    headerName: 'Date Added',
    width: 180,
    type: 'dateTime',
    valueFormatter: (params) => {
      const date = params ? new Date(params) : null
      return date ? format(date, 'yyyy-MM-dd HH') : 'Invalid Date'
    },
  },
  {
    field: 'link',
    headerName: 'Link',
    width: 100,
    renderCell: (params) => (
      <Link style={{ textDecoration: 'none' }} to={`/task/${params.row.id}`}>
        Изменить
      </Link>
    ),
  },
]

export default function DataTable({ tasks = [] }) {
  const [sortModel, setSortModel] = React.useState([
    { field: 'createdAt', sort: 'desc' },
  ])
  return (
    <div style={{ height: '98.6dvh', width: '100%', backgroundColor: 'white' }}>
      <DataGrid
        rows={tasks}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 20, pageSize: 13 },
          },
        }}
        pageSizeOptions={[13, 20, 30]}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
      />
    </div>
  )
}
