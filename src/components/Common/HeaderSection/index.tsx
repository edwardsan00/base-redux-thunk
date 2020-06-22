import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Theme } from '@material-ui/core'

interface Props {
  title: string
}

const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
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
}))

const HeaderSection: FunctionComponent<Props> = ({ title, children }): JSX.Element => {
  const classes = useStyles()
  return (
    <div className={classes.headerAdmin}>
      <h2 className={classes.title}>{title}</h2>
      {children}
    </div>
  )
}

HeaderSection.propTypes = {
  title: PropTypes.string.isRequired,
}

export default HeaderSection