import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(({ palette }) => ({
  containerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '70px',
    backgroundColor: palette.primary.main,
    padding: '0 20px'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center'
  },
  headerTitle: {
    color: 'white',
    fontSize: '1rem',
    fontWeight: 'normal',
    marginLeft: 10
  }
}))

const HeaderMain: FunctionComponent = (): JSX.Element => {
  const classes = useStyles()
  return (
    <div className={classes.containerHeader}>
      <div className={classes.headerLeft}>
        <h1 className={classes.headerTitle}>Header</h1>
      </div>
    </div>
  )
}

export default HeaderMain