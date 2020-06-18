import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(({ palette }) => ({
  containerLoading: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
}))

const Loading: FunctionComponent = (): JSX.Element => {
  const classes = useStyles()
  return (
    <div className={classes.containerLoading}>
      <p>Loading</p>
    </div>
  )
}

export default Loading