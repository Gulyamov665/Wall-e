import React, { useState } from 'react'
import { MultiSelect } from 'primereact/multiselect'

export default function MultiSelectCustom({ data }) {
  const [selectedCities, setSelectedCities] = useState(null)

  return (
    <div className="">
      <MultiSelect
        value={selectedCities}
        onChange={(e) => setSelectedCities(e.value)}
        options={data}
        display="chip"
        optionLabel="name"
        placeholder="Select Cities"
        maxSelectedLabels={3}
        className="select"
        showClear={true}
      />
    </div>
  )
}
