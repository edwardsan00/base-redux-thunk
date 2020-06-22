import React, { useEffect, useState, useRef } from 'react'
import {
  makeStyles,
  FormControl,
  OutlinedInput,
  FormHelperText,
  TableContainer, Table, TableHead, TableCell, TableRow, Button, TableSortLabel, TableBody, Theme, Typography } from '@material-ui/core'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'reducers'
import { Administrator, getAdministrators } from 'reducers/administratorsDucks'
import DrawerEdit from 'components/DrawerEdit'

interface HeaderKeys {
  label: string
  sort: boolean,
  key: keyof Administrator
}

const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  containerAdmin: {

  },
  headerAdmin: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing(2)
  },
  title: {
    fontSize: '26px',
    lineHeight: '32px',
    color: palette.primary.main,
    margin: 0,
  },
  containerTable: {
    backgroundColor: palette.common.white
  },
  headerTable: {
    width: '100%'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  table: {
    minWidth: 1200
  },
  tableRow: {
    '&:hover': {
      '& $tableCellEdit': {
        opacity: 1,
        transition: 'all .15s ease'
      }
    }
  },
  tableCellEdit: {
    opacity: 0,
    transition: 'all .15s ease'
  },
  icons: {
    cursor: 'pointer'
  },
  editIcon: {
    marginRight: 15
  },
  formEdit: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    marginBottom: spacing(2)
  },
  labelForm: {
    marginBottom: spacing(1)
  },
  helpText: {
    marginLeft: 0,
    color: palette.error.main
  }
}), { name: 'Administrators'})

const headerTable: Array<HeaderKeys> = [
  { label: 'ID', sort: true, key: 'id' },
  { label: 'Nombre', sort: true, key: 'first_name' },
  { label: 'Apellido', sort: true, key: 'last_name' },
  { label: 'Email', sort: true, key: 'email' },
]


const Adminstrators = () => {
  const classes = useStyles()
  const { register, errors, handleSubmit } = useForm<Administrator>()
  const formLogin = useRef<HTMLFormElement>(null)
  const dispatch = useDispatch()
  const [openDrawer, setOpenDrawer ] = useState(true)
  const [ editAdmin, setEditAdmin ] = useState<Administrator | null>(null)
  const { administrators } = useSelector((state: RootState) => state.administrators)

  const onSubmit = handleSubmit(({ first_name, last_name, email }) => {
    console.log("onSubmit -> email", email)
    console.log("onSubmit -> last_name", last_name)
    console.log("onSubmit -> first_name", first_name)
  })

  const handlerToggleDrawer = (id?: number) => {
    setOpenDrawer(!openDrawer)
    if(id){
      const currentAdmin = administrators.find(({ id: idAdmin }) => idAdmin === id ) || null
      setEditAdmin(currentAdmin)
    }
  }

  const handlerEditAdmin = () => {
    formLogin.current?.dispatchEvent(new Event('submit', { cancelable: true }))
    setOpenDrawer(!openDrawer)
  }

  useEffect(() => {
    dispatch(getAdministrators())
  }, [dispatch])

  return (
    <div className={classes.containerAdmin}>
      <div className={classes.headerAdmin}>
        <h2 className={classes.title}>Adminstradores</h2>
        <Button variant="contained" color="primary">Agregar Nuevo</Button>
      </div>
      <div className={classes.containerTable}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <TableHead className={classes.headerTable}>
              <TableRow>
                {headerTable.map(({ label, key }) => (
                  <TableCell key={key} sortDirection='asc'>
                    <TableSortLabel>
                      {label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell align='center'>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                administrators.map(({ id, first_name, last_name, email }) => (
                  <TableRow
                    className={classes.tableRow}
                    hover key={id}>
                    <TableCell component="th" scope="row">{id}</TableCell>
                    <TableCell>{first_name}</TableCell>
                    <TableCell>{last_name}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell align="center" className={classes.tableCellEdit}>
                      <EditIcon className={clsx([classes.editIcon, classes.icons])} onClick={() => handlerToggleDrawer(id)} />
                      <DeleteIcon className={clsx([classes.icons])} />
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      { openDrawer && editAdmin ? (
        <DrawerEdit 
          title='Editar Call center' 
          onHandlerToggleDrawer={handlerToggleDrawer} 
          onHandlerAction={handlerEditAdmin} 
          openDrawer={openDrawer}>
          <form ref={formLogin} onSubmit={onSubmit} className={classes.formEdit}>
            <FormControl className={classes.input} variant="outlined">
              <Typography variant='body2' className={classes.labelForm}>First name</Typography>
              <OutlinedInput
                defaultValue={editAdmin.first_name}
                name="first_name"
                inputRef={register({
                  required: {
                    value: true,
                    message: 'Por favor ingrese su nombre'
                  }
                })}
                margin="dense"
                type="text"
                placeholder="Usuario" />
              {errors?.first_name ? <FormHelperText className={classes.helpText}>{errors.first_name.message}</FormHelperText> : null}
            </FormControl>
            <FormControl className={classes.input} variant="outlined">
              <Typography variant='body2' className={classes.labelForm}>Last name</Typography>
              <OutlinedInput
                defaultValue={editAdmin.last_name}
                name="last_name"
                inputRef={register({
                  required: {
                    value: true,
                    message: 'Por favor ingrese su apellido'
                  }
                })}
                margin="dense"
                type="text" />
              {errors?.last_name ? <FormHelperText className={classes.helpText}>{errors.last_name.message}</FormHelperText> : null}
            </FormControl>
            <FormControl className={classes.input} variant="outlined">
              <Typography variant='body2' className={classes.labelForm}>Email</Typography>
              <OutlinedInput
                defaultValue={editAdmin.email}
                name="email"
                inputRef={register({
                  required: {
                    value: true,
                    message: 'Por favor ingrese su correo electronico'
                  },
                  pattern: {
                    value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
                    message: 'Debe ser un correo electronico'
                  }
                })}
                margin="dense"
                type="text" />
              {errors?.email ? <FormHelperText className={classes.helpText}>{errors.email.message}</FormHelperText> : null}
            </FormControl>
          </form>
        </DrawerEdit>
      ) : null }

    </div>
  )
}


export default Adminstrators