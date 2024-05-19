import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'classification', headerName: 'Classification', width: 130 },
  { field: 'name', headerName: 'name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) =>
      `${row.classification || ''} ${row.name || ''}`,
  },
]

export default function DataTable({ tasks }) {
  const handleRowClick = (params) => {
    console.log(params.row.id)
  }
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
        // checkboxSelection
        onRowClick={(params) => console.log(params.row.id)}
      />
    </div>
  )
}
