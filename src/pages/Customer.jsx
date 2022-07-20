import React from 'react'
import { Dialog, StandardPageLayout } from '../components'
import { useCustomer } from '../hooks'
import { CustomerForm } from '../components/FormCollection'
import { useSelector } from 'react-redux'

export default function Customer() {
  const cols = [
    { id: 'customer_name', label: "Name" },
    { id: 'customer_email', label: "Email" },
    { id: 'customer_phone', label: "Phone" },
    { id: 'customer_address', label: "Address" },
    { id: 'publishedAt', label: "Published At", type: 'date' },
    { id: 'updatedAt', label: "Updated At", type: 'date' },
  ]

  const [customers, setCustomer] = useCustomer()
  const [open, setOpen] = React.useState(false)
  const [dialogType, setDialogType] = React.useState()
  const [content, setContent] = React.useState({
    text: "Fill input below:",
    negative_button: 'Cancel',
    positive_button: 'Update',
    title: 'Update Data'
  })

  React.useEffect(() => {
    const param = {}
    setCustomer(param, 'list')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAdd = () => {
    setContent({
      text: "Fill input below:",
      negative_button: 'Cancel',
      positive_button: 'Add',
      title: 'Create Customer'
    })
    setDialogType('create')
    setCustomer(null, 'select')
    setOpen(true)
  }

  const handleEdit = (selectedData) => {
    setContent({
      text: "Fill input below:",
      negative_button: 'Cancel',
      positive_button: 'Update',
      title: 'Update Data'
    })
    setDialogType('update')
    setCustomer(selectedData, 'select')
    setOpen(true)
  }

  const handleDelete = (selectedData) => {
    // setCustomer(selectedData, 'delete')
    setContent({
      text: `Are you sure want to delete ${selectedData?.attributes?.customer_name}'s data?`,
      negative_button: 'Cancel',
      positive_button: 'Delete',
      title: 'Confirmation',
      onSubmit: (e) => handleDeleteConfirmed(e)
    })
    setDialogType('confirmation')
    setCustomer(selectedData, 'select')
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    setOpen(false)
    setCustomer(null, 'select')

    if (reason && reason === "backdropClick" && dialogType !== 'confirmation') return;
  }

  const selectedSingleData = useSelector(state => state.selectedCustomer?.items ?? null)

  const handleDeleteConfirmed = () => {
    setOpen(false)
    setCustomer(selectedSingleData, 'remove')
  }

  return (
    <>
      <Dialog
        open={open}
        handleClose={handleClose}
        content={content}
        param={{
          disableEscape: dialogType !== 'confirmation' ? true : false
        }}
        noAction={dialogType !== 'confirmation'}
      >
        {dialogType === 'confirmation'
          ? null
          : <CustomerForm
            callback={handleClose}
            type={dialogType}
          />
        }
      </Dialog>
      <div>
        <StandardPageLayout
          store="customers"
          cols={cols}
          rows={customers}
          title="Customer Data Management"
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </>
  )
}
