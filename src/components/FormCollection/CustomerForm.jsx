import { Button, Stack, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import { useCustomer } from '../../hooks'

const useStyles = makeStyles(theme => ({
  formControl: {
    paddingBottom: '30px',
    minWidth: '300px'
  },
  input: {
    // minWidth: '200px'
  }
}))

export default function CustomerForm({ callback, type }) {
  const classes = useStyles()
  const selectedData = useSelector(state => state.selectedCustomer?.items ?? null)
  // eslint-disable-next-line no-unused-vars
  const [customers, setCustomer] = useCustomer()

  // const navigate = useNavigate()
  const [values, setValues] = React.useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    customer_address: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const param = {
      "data": {
        customer_name: values.customer_name,
        customer_phone: values.customer_phone,
        customer_email: values.customer_email,
        customer_address: values.customer_address,
      }
    }
    if (type === 'update') {
      param.data.id = selectedData.id
    }
    setCustomer(param, type)
    callback()
  }

  React.useEffect(() => {
    setValues({
      customer_id: selectedData?.id,
      customer_name: selectedData?.attributes?.customer_name,
      customer_phone: selectedData?.attributes?.customer_phone,
      customer_email: selectedData?.attributes?.customer_email,
      customer_address: selectedData?.attributes?.customer_address,
    })
  }, [selectedData])

  return (
    <>
      <form onSubmit={handleSubmit}>
        {values.customer_id
          ? <div className={classes.formControl}>
            <h4>ID Data: {values.customer_id}</h4>
          </div>
          : null
        }
        <div className={classes.formControl}>
          <TextField
            // error
            fullWidth
            className={classes.input}
            value={values.customer_name}
            onChange={handleChange('customer_name')}
            id="outlined-error-helper-text"
            label="Customer Name"
            required
          // helperText="Incorrect entry."
          />
        </div>
        <div className={classes.formControl}>
          <TextField
            // error
            fullWidth
            className={classes.input}
            value={values.customer_phone}
            onChange={handleChange('customer_phone')}
            id="outlined-error-helper-text"
            label="Customer Phone"
            required
          // helperText="Incorrect entry."
          />
        </div>
        <div className={classes.formControl}>
          <TextField
            // error
            fullWidth
            className={classes.input}
            value={values.customer_email}
            onChange={handleChange('customer_email')}
            id="outlined-error-helper-text"
            label="Customer Email"
            required
          // helperText="Incorrect entry."
          />
        </div>
        <div className={classes.formControl}>
          <TextField
            // error
            fullWidth
            className={classes.input}
            value={values.customer_address}
            onChange={handleChange('customer_address')}
            id="outlined-error-helper-text"
            label="Customer Address"
          // helperText="Incorrect entry."
          />
        </div>
        <Stack sx={{ paddingBottom: '10px' }}>
          <Button type="button" onClick={callback} fullWidth variant="outlined" >Cancel</Button>
        </Stack>
        <Stack spacing={2}>
          <Button type="submit" fullWidth variant="contained" >Submit</Button>
        </Stack>
      </form>
    </>
  )
}