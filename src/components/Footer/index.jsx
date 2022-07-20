import { makeStyles } from '@mui/styles'
import React from 'react'


const useStyles = makeStyles(theme => ({
  footer: {
    position: 'fixed',
    background: theme.palette.common.white,
    left: '0',
    bottom: '0',
    width: '100%',
    textAlign: 'center',
    padding: '20px 0'
  }
}))

export default function Footer() {
  const classes = useStyles()
  return (
    <div className={classes.footer}>copyright @2022 by: Febi Putra Angiosty</div>
  )
}
