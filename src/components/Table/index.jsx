import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { makeStyles } from '@mui/styles'
import moment from 'moment';
import { IconButton } from '@mui/material';
import { DeleteForever, Edit } from '@mui/icons-material';
import { SysObj } from '../../common/collections/system';
import { currency } from '../../helpers/utils';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    overFlow: 'auto'
  }
}))

export default function DenseTable({ cols, rows, onEdit, onDelete, noAction }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const classes = useStyles()

  const switchRender = (val, type, converter, last, parent, row) => {
    switch (type) {
      case 'date':
        return moment(val).format('LLLL')
      case 'nested':
        return converter(row, last, parent)
      case 'currency':
        return currency(val)
      case 'image':
        return <img src={`${SysObj.SETTINGS.PREFIX_URL.default}${val?.data?.[0]?.attributes?.formats?.thumbnail.url}`} alt={val?.data?.[0]?.attributes?.caption ?? 'no-preview'} title={val?.data?.[0]?.attributes?.name ?? 'no-data'} />
      default:
        return val
    }
  }

  return (
    <TableContainer className={classes.root}>
      <Table sx={{ maxWidth: '100%' }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            {cols?.map((item, index) => (
              <TableCell key={index} align="left">{item.label}</TableCell>
            ))}

            {noAction
              ? null
              : <TableCell>Actions</TableCell>
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.length > 0
            ? rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell key={index} component="th" scope="row">
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  {cols?.map((item, index) => {
                    return (
                      <TableCell key={index} component="th" scope="row" sx={{ padding: '10px 0' }}>
                        {switchRender(row?.attributes[item.id], item.type, item.converter, item.last, item.parent, row)}
                      </TableCell>
                    )
                  })}
                  {noAction
                    ? null
                    : <TableCell key={index} component="th" scope="row">
                      <IconButton onClick={(e) => onEdit(row)}><Edit /></IconButton>
                      <IconButton onClick={(e) => onDelete(row)}><DeleteForever /></IconButton>
                    </TableCell>
                  }
                </TableRow>
              ))
            : "No data"
          }
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}



