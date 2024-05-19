import React from 'react'
import { Calendar } from 'primereact/calendar'

export default function CustomCalendar({ register, param }) {
  return (
    <div className="card flex flex-wrap gap-3 p-fluid">
      <div className="flex-auto">
        <label htmlFor="buttondisplay" className="font-bold block mb-2">
          Button Display
        </label>
        <Calendar dateFormat='dd/mm/yy' id="buttondisplay" {...register(param)} showIcon />
      </div>
    </div>
  )
}
