import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ResponsiveDialog({ open, handleClose, content, param, children, noAction }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        open={open}
        disableEscapeKeyDown={param.disableEscape}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {content.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {content.text}
          </DialogContentText>
          {children}
        </DialogContent>
        {noAction
          ? null
          : <DialogActions>
            <Button variant="contained" autoFocus onClick={handleClose}>
              {content.negative_button}
            </Button>
            <Button variant="outlined" onClick={content.onSubmit} autoFocus>
              {content.positive_button}
            </Button>
          </DialogActions>
        }
      </Dialog>
    </>
  );
}
