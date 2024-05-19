import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'classification', headerName: 'Classification', width: 130 },
  { field: 'name', headerName: 'name', width: 130 },

  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (value, row) =>
  //     `${row.classification || ''} ${row.name || ''}`,
  // },
  {
    field: 'created_at',
    headerName: 'Date Added',
    width: 180,
    type: 'dateTime',
    valueFormatter: (params) => {
      console.log(params)
      const date = params ? new Date(params) : null
      return date ? format(date, 'yyyy-MM-dd HH') : 'Invalid Date'
    },
  },
  {
    field: 'link',
    headerName: 'Link',
    width: 150,
    renderCell: (params) => (
      <Link style={{ textDecoration: 'none' }} to={`/task/${params.row.id}`}>
        Изменить
      </Link>
    ),
  },
]

export default function DataTable({ tasks }) {
  console.log(tasks)
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
            paginationModel: { page: 0, pageSize: 13 },
          },
        }}
        pageSizeOptions={[13, 20, 30]}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
      />
    </div>
  )
}
