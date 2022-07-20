import { useTheme } from '@mui/styles'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export default function MyDropzone({ setFiles, files }) {
  const theme = useTheme()
  const [preview, setPreview] = useState()
  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles)
    var urlCreator = window.URL || window.webkitURL;
    const imgUrl = urlCreator.createObjectURL(acceptedFiles[0])
    setPreview(imgUrl)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <>
      <div style={{
        minHeight: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme.palette.primary.light,
        borderRadius: '20px',
        position: 'relative'
      }} {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive
            ? <p>Drop the files here ...</p>
            : !preview
              ? <p>Drag 'n' drop some files here, or click to select files</p>
              : <img src={preview} alt="preview" style={{ height: 'auto', width: '100%', objectFit: 'cover' }} />
        }
      </div>
      <div>
      </div>
    </>
  )
}