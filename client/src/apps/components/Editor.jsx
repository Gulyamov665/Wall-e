import React, { useState } from 'react'
import { Editor } from 'primereact/editor'

export default function BasicDemo() {
  const [text, setText] = useState('')

  console.log(text)

  return (
    <div className="card">
      <Editor
        value={text}
        onTextChange={(e) => setText(e.htmlValue)}
        style={{ height: '320px' }}
      />
    </div>
  )
}
