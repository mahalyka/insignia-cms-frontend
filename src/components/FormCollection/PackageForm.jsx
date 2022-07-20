import { Button, Stack, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import { usePackage } from '../../hooks'
import { Dropzone } from '../../components'

const useStyles = makeStyles(theme => ({
  formControl: {
    paddingBottom: '30px',
    minWidth: '300px'
  },
  input: {
    // minWidth: '200px'
  }
}))

export default function PackageForm({ callback, type }) {
  const classes = useStyles()
  const selectedData = useSelector(state => state.selectedPackage?.items ?? null)
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = usePackage()

  // const navigate = useNavigate()
  const [values, setValues] = React.useState({
    package_title: '',
    img_package: '',
    desc_package: '',
    price: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    // const formData = new FormData();
    // formData.append("img_package", values.img_package[0]);
    // formData.append("package_title", values.package_title);
    // formData.append("desc_package", values.desc_package);
    // formData.append("price", values.price);
    const formData = {
      data: {
        package_title: values.package_title,
        // img_package: values.img_package[0],
        desc_package: values.desc_package,
        price: values.price,
      }
    }
    if (type === 'update') {
      formData.append("id", selectedData.id);
    }
    setData(formData, type)
    callback()
  }

  const setFiles = (files) => {
    setValues(prevState => ({
      ...prevState,
      img_package: files
    }))
  }

  React.useEffect(() => {
    setValues({
      customer_id: selectedData?.id,
      package_title: selectedData?.attributes?.customer_name,
      img_package: selectedData?.attributes?.img_package,
      desc_package: selectedData?.attributes?.desc_package,
      price: selectedData?.attributes?.price,
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
            fullWidth
            className={classes.input}
            value={values.package_title}
            onChange={handleChange('package_title')}
            id="outlined-error-helper-text"
            label="Package Name"
            required
          />
        </div>
        <div className={classes.formControl}>
          <TextField
            fullWidth
            className={classes.input}
            value={values.desc_package}
            onChange={handleChange('desc_package')}
            id="outlined-error-helper-text"
            label="Package Description"
            required
          />
        </div>
        <div className={classes.formControl}>
          <TextField
            fullWidth
            type="number"
            className={classes.input}
            value={values.price}
            onChange={handleChange('price')}
            id="outlined-error-helper-text"
            label="Price"
            required
          />
        </div>
        <div className={classes.formControl}>
          <Dropzone
            setFiles={setFiles}
            files={values.img_package}
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