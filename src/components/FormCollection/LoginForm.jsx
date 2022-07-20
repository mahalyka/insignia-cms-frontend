import { Button, IconButton, InputAdornment, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  formControl: {
    paddingBottom: '30px',
    minWidth: '300px'
  },
  input: {
    // minWidth: '200px'
  }
}))

export default function LoginForm() {
  const classes = useStyles()
  const navigate = useNavigate()
  const [values, setValues] = React.useState({
    username: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={classes.formControl}>
          <TextField
            // error
            fullWidth
            className={classes.input}
            value={values.username}
            onChange={handleChange('username')}
            id="outlined-error-helper-text"
            label="Username"
            required
          // helperText="Incorrect entry."
          />
        </div>
        <div className={classes.formControl}>
          <TextField
            // error
            fullWidth
            className={classes.input}
            id="outlined-error-helper-text"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            required
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }}
            label="Password"
          // helperText="Incorrect entry."
          />
        </div>
        <Button type="submit" fullWidth variant="outlined" >Submit</Button>
      </form>
    </>
  )
}