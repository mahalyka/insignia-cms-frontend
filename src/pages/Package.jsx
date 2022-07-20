import React from 'react'
import { Dialog, StandardPageLayout } from '../components'
import { usePackage } from '../hooks'
import { PackageForm } from '../components/FormCollection'
import { useSelector } from 'react-redux'

export default function Package() {
  const cols = [
    { id: 'img_package', label: "Image", type: 'image' },
    { id: 'desc_package', label: "Name" },
    { id: 'price', label: "Price", type: 'currency' },
    { id: 'publishedAt', label: "Published At", type: 'date' },
    { id: 'updatedAt', label: "Updated At", type: 'date' },
  ]

  const [data, setData] = usePackage()
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
      title: 'Create Package'
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
          : <PackageForm
            callback={handleClose}
            type={dialogType}
          />
        }
      </Dialog>
      <div>
        <StandardPageLayout
          store="packages"
          cols={cols}
          rows={data}
          title="Package Data Management"
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </>
  )
}
