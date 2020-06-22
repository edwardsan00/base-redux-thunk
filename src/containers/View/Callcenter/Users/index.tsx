import React, { useEffect } from 'react'
import { makeStyles, TableContainer, Table, TableHead, TableCell, TableRow, Button, TableSortLabel, TableBody, Theme } from '@material-ui/core'
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@material-ui/icons'
import clsx from 'clsx'
import { Administrator, getAdministrators } from 'reducers/administratorsDucks'
import { RootState } from 'reducers'
import { useSelector, useDispatch } from 'react-redux'
import HeaderSection from 'components/Common/HeaderSection'

interface HeaderKeys {
  label: string
  sort: boolean,
  key: keyof Administrator
}

const useStyles = makeStyles(({ palette }: Theme) => ({
  containerAdmin: {

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
  }
}))

const headerTable: Array<HeaderKeys> = [
  { label: 'ID', sort: true, key: 'id' },
  { label: 'Nombre', sort: true, key: 'first_name' },
  { label: 'Apellido', sort: true, key: 'last_name' },
  { label: 'Email', sort: true, key: 'email' },
]


const Adminstrators = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { administrators } = useSelector((state: RootState) => state.administrators)

  useEffect(() => {
    dispatch(getAdministrators())
  }, [dispatch])

  return (
    <div className={classes.containerAdmin}>
      <HeaderSection title="Usuarios">
        <Button variant="contained" color="primary">Agregar Nuevo</Button>
      </HeaderSection>
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
                <TableCell />
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
                      <EditIcon className={clsx([classes.editIcon, classes.icons])} />
                      <DeleteIcon className={clsx([classes.icons])} />
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}


export default Adminstrators