import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogActions, DialogTitle, Button } from '@material-ui/core'

interface Props {
  title: string,
  openConfirm: boolean,
  titleAction?: string
  onHandleCancelConfirm: () => void
  onHandleConfirm: () => void
}

const Confirm: FunctionComponent<Props> = ({ title, openConfirm, onHandleCancelConfirm, onHandleConfirm, titleAction = 'Eliminar' }): JSX.Element => {
  return (
    <Dialog
      open={openConfirm}
      onClose={onHandleCancelConfirm}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button onClick={onHandleCancelConfirm} color="primary">
          Cancelar
        </Button>
        <Button onClick={onHandleConfirm} color="secondary" variant="contained" autoFocus>
          {titleAction}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

Confirm.propTypes = {
  title: PropTypes.string.isRequired,
  openConfirm: PropTypes.bool.isRequired,
  onHandleCancelConfirm: PropTypes.func.isRequired,
  onHandleConfirm: PropTypes.func.isRequired,
  titleAction: PropTypes.string
}

export default Confirm