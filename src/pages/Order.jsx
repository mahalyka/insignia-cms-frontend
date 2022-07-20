import React from 'react'
import { Dialog, StandardPageLayout } from '../components'
import { useOrder } from '../hooks'
import { OrderForm } from '../components/FormCollection'
import { useSelector } from 'react-redux'

export default function Order() {
  const customerNestedValue = (val, last, parent) => {
    const newVal = val?.attributes?.[parent]?.data?.attributes?.[last] ?? ""

    return newVal
  }

  const cols = [
    { id: 'id_customer.data.attributes.customer_name', label: "Name", parent: 'id_customer', last: 'customer_name', converter: (val, last, parent) => customerNestedValue(val, last, parent), type: 'nested' },
    { id: 'id_customer.data.attributes.customer_email', parent: 'id_customer', last: 'customer_email', converter: (val, last, parent) => customerNestedValue(val, last, parent), label: "Email", type: 'nested' },
    { id: 'id_customer.data.attributes.customer_phone', parent: 'id_customer', last: 'customer_phone', converter: (val, last, parent) => customerNestedValue(val, last, parent), label: "Phone", type: 'nested' },
    { id: 'id_customer.data.attributes.customer_address', parent: 'id_customer', last: 'customer_address', converter: (val, last, parent) => customerNestedValue(val, last, parent), label: "Address", type: 'nested' },
    { id: 'total_price', label: "Total Payment", type: 'currency' },
    { id: 'publishedAt', label: "Published At", type: 'date' },
    { id: 'updatedAt', label: "Updated At", type: 'date' },
  ]

  const [data, setData] = useOrder()
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
    setData(param, 'list')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAdd = () => {
    setContent({
      text: "Fill input below:",
      negative_button: 'Cancel',
      positive_button: 'Add',
      title: 'Create Order'
    })
    setDialogType('create')
    setData(null, 'select')
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
    setData(selectedData, 'select')
    setOpen(true)
  }

  const handleDelete = (selectedData) => {
    // setData(selectedData, 'delete')
    setContent({
      text: `Are you sure want to delete ${selectedData?.attributes?.customer_name}'s data?`,
      negative_button: 'Cancel',
      positive_button: 'Delete',
      title: 'Confirmation',
      onSubmit: (e) => handleDeleteConfirmed(e)
    })
    setDialogType('confirmation')
    setData(selectedData, 'select')
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    setOpen(false)
    setData(null, 'select')

    if (reason && reason === "backdropClick" && dialogType !== 'confirmation') return;
  }

  const selectedSingleData = useSelector(state => state.selectedCustomer?.items ?? null)

  const handleDeleteConfirmed = () => {
    setOpen(false)
    setData(selectedSingleData, 'remove')
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
          : <OrderForm
            callback={handleClose}
            type={dialogType}
          />
        }
      </Dialog>
      <div>
        <StandardPageLayout
          store="orders"
          cols={cols}
          rows={data}
          title="Transaction Order Data Management"
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          noAction
        />
      </div>
    </>
  )
}
