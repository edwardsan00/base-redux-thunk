import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import { Drawer, makeStyles, Button, Theme, Divider, Typography } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

interface Props {
    onHandlerToggleDrawer: () => void
    onHandlerAction: () => void
    openDrawer: boolean
    title?: string
}

const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  containerDrawer: {
   width: 400,
   height: '100%',
   display: 'flex',
   flexDirection: 'column'
  },
  body: {
    flex: 1,
    overflowY: 'auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    padding: spacing(2)
  },
  container: {
    padding: `${spacing(4)}px ${spacing(2)}px`
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: spacing(2),
    flex: '70px 0 0',
    borderTop: `solid 1px ${palette.grey[400]}`
  },
  button: {
    marginLeft: spacing(1),
  }
}), { name: 'DrawerEdit' })

const DrawerEdit: FunctionComponent<Props> = ({ onHandlerToggleDrawer, onHandlerAction, openDrawer, children, title = 'Editar' }): JSX.Element => {
  const classes = useStyles()
  return (
    <Drawer anchor='right' open={openDrawer} onClose={onHandlerToggleDrawer}>
      <div className={classes.containerDrawer}>
        <div className={classes.body}>
          <div className={classes.header}>
            <Typography variant='body1'>{ title }</Typography>
            <CloseIcon onClick={onHandlerToggleDrawer} />
          </div>
          <Divider />
          <div className={classes.container}>
            {children}
          </div>
        </div>
        <div className={classes.footer}>
          <Button className={classes.button} onClick={onHandlerToggleDrawer} color='secondary'>Cancelar</Button>
          <Button className={classes.button} onClick={onHandlerAction} variant='contained' color='primary'>Actualizar</Button>
        </div>
      </div>
    </Drawer>
  )
}

DrawerEdit.propTypes = {
  onHandlerToggleDrawer: PropTypes.func.isRequired,
  onHandlerAction: PropTypes.func.isRequired,
  openDrawer: PropTypes.bool.isRequired,
  title: PropTypes.string,
}

export default DrawerEdit