import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Typography, Theme } from '@material-ui/core'
import { EmptyLogo } from 'components/Icons'
interface Props {
  title?: string
}

const useStyles = makeStyles(({ spacing }: Theme) => ({
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    marginTop: spacing(2)
  }
}))

const NotFound: FunctionComponent<Props> = ({ title = 'Not found' }): JSX.Element => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <EmptyLogo />
      <Typography className={classes.title} variant='h6'>{title}</Typography>
    </div>
  )
}

NotFound.propTypes = {
  title: PropTypes.string
}

export default NotFound