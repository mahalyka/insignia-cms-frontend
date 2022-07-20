import { Box, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import { Backdrop, Table } from '../../components'

const useStyles = makeStyles(theme => ({
  actionContainer: {
    paddingBottom: '50px',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  titleContainer: {
    paddingBottom: '20px',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    fontSize: '1rem',
    fontWeight: 'bold',
    fontStyle: 'italic'
  }
}))

export default function StandardPageLayout({ cols, rows, onAdd, title, store, onEdit, onDelete, noAction }) {
  const classes = useStyles()
  const isLoading = useSelector(state => state?.[store].isLoading)

  return (
    <>
      <Backdrop open={isLoading} />
      <div className={classes.titleContainer}>
        {title}
      </div>
      <div className={classes.actionContainer}>
        <Button variant="outlined" onClick={onAdd}>Create New</Button>
      </div>
      <Box>
        <Table cols={cols} rows={rows} onEdit={onEdit} onDelete={onDelete} noAction={noAction} />
      </Box>
    </>
  )
}
