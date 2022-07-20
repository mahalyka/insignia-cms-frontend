import { Button, Stack, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import { useCustomer, useOrder, usePackage } from '../../hooks'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Autocomplete } from '../../components'

const useStyles = makeStyles(theme => ({
  formControl: {
    paddingBottom: '30px',
    minWidth: '300px'
  },
  input: {
    // minWidth: '200px'
  }
}))

export default function OrderForm({ callback, type }) {
  const classes = useStyles()
  const selectedData = useSelector(state => state.selectedCustomer?.items ?? null)
  // eslint-disable-next-line no-unused-vars
  const [customers, setCustomer] = useCustomer()
  // eslint-disable-next-line no-unused-vars
  const [packages, setPackage] = usePackage()
  // eslint-disable-next-line no-unused-vars
  const [orders, setOrder] = useOrder()

  React.useEffect(() => {
    setCustomer({}, 'list')
    setPackage({}, 'list')
  }, [])

  // const navigate = useNavigate()
  const [values, setValues] = React.useState({
    customer: '',
    order_details: '',
    total_price: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const param = {
      "data": {
        id_customer: values.customer,
        order_details: values.order_details,
        total_price: values.total_price
      }
    }
    if (type === 'update') {
      param.data.id = selectedData.id
    }
    setOrder(param, type)
    callback()
  }

  React.useEffect(() => {
    setValues({
      customer: selectedData?.id_customer,
      order_details: selectedData?.attributes?.order_details,
      total_price: selectedData?.attributes?.total_price,
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
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Customer</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Customer"
              value={values.customer_id}
              onChange={handleChange('customer')}
            >
              {customers.map(item => {
                return <MenuItem value={item.id}>{item.attributes.customer_name}</MenuItem>
              })
              }
            </Select>
          </FormControl>
        </div>
        <div className={classes.formControl}>
          <Autocomplete
            label="Package"
            options={packages}
            onChange={handleChange('order_details')}
            field="package_title"
          />
        </div>
        <div className={classes.formControl}>
          <TextField
            // error
            fullWidth
            type="number"
            className={classes.input}
            value={values.total_price}
            onChange={handleChange('total_price')}
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