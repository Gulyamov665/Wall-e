import React from 'react'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import { useForm } from 'react-hook-form'
import { Dropdown } from 'primereact/dropdown'
import { MultiSelect } from 'primereact/multiselect'
import { InputTextarea } from 'primereact/inputtextarea'
import { FileUpload } from 'primereact/fileupload'

export default function CreateTaskForm() {
  const { register, handleSubmit } = useForm()

  const handleLoad = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(handleLoad)}>
      <InputText type="text" placeholder="name" {...register('name')} />
      <div className="flex-auto">
        <label htmlFor="buttondisplay" className="font-bold block mb-2"></label>
        <Calendar
          id="1"
          {...register('start_time')}
          showIcon
          placeholder="start time"
        />
        <label htmlFor="buttondisplay" className="font-bold block mb-2"></label>
        <Calendar
          id="2"
          {...register('dead_line')}
          showIcon
          placeholder="dead line"
        />
      </div>
      <div className="card">
        <Dropdown
          value={'selectedCity'}
          // options={'cities'}
          placeholder="Select a status"
          className="w-full md:w-14rem"
          {...register('status')}
        />

        <Dropdown
          value={'selectedCity'}
          // options={'cities'}
          placeholder="Select an executor"
          className="w-full md:w-14rem"
          {...register('executor')}
        />

        <MultiSelect
          // value={'selectedCities'}
          // options={'data'}
          display="chip"
          optionLabel="name"
          placeholder="Select Cities"
          maxSelectedLabels={3}
          // className="select"
          showClear={true}
          {...register('observers')}
        />

        <InputTextarea
          autoResize
          // value={value}
          // onChange={(e) => setValue(e.target.value)}
          rows={5}
          cols={30}
        />

        <Dropdown
          value={'selectedCity'}
          // options={'cities'}
          placeholder="Select an priority"
          className="w-full md:w-14rem"
          {...register('priority')}
        />

        <div className="card">
          <FileUpload
            // name="demo[]"
            // url={'/api/upload'}
            multiple
            accept="image/*"
            {...register('uploaded_images')}
            maxFileSize={1000000}
            emptyTemplate={
              <p className="m-0">Drag and drop files to here to upload.</p>
            }
          />
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
