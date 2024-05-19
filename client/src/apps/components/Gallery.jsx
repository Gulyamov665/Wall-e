import React, { useState, useEffect } from 'react'
import { Galleria } from 'primereact/galleria'

export default function BasicDemo({ data = [] }) {
  const [images, setImages] = useState(null)

  useEffect(() => {
    setImages(data)
  }, [])

  console.log(images)

  const responsiveOptions = [
    {
      breakpoint: '991px',
      numVisible: 4,
    },
    {
      breakpoint: '767px',
      numVisible: 3,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
    },
  ]

  const itemTemplate = (item) => {
    return <img src={item.image} alt={item.alt} style={{ width: '550px', height :"150px",objectFit: "cover" }} />
  }

  const thumbnailTemplate = (item) => {
    return <img src={item.image} alt={item.alt} style={{ width: '550px', height :"150px",objectFit: "cover", paddingBottom: "150px" }} />
  }

  return (
    <div className="">
      <Galleria
        value={images}
        responsiveOptions={responsiveOptions}
        numVisible={5}
        style={{ width: '250px', height : "150px"}}
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
      />
    </div>
  )
}
