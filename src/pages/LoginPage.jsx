import { makeStyles } from '@mui/styles'
import React from 'react'
import { LoginForm } from '../components/FormCollection'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    width: '100vw',
    background: theme.palette.primary.light
  },
  inputContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    height: '300px',
    background: theme.palette.common.white,
    borderRadius: '50px',
    padding: theme.spacing(3)
  },
  title: {
    textAlign: 'center',
    color: theme.palette.common.black
  }

}))

export default function LoginPage() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.inputContainer}>
        <div className={classes.title}>
          <h3>
            Login Page
          </h3>
        </div>
        <div>
          <LoginForm />
        </div>

      </div>
    </div>
  )
}
