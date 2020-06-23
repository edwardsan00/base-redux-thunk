import React, { FunctionComponent, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles, Typography, ExpansionPanelDetails, Theme, withStyles } from '@material-ui/core'
import { 
  ExpansionPanelSummary as MuiExpansionPanelSummary,
  ExpansionPanel as MuiExpansionPanel 
} from '@material-ui/core'
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons'

interface LinkSidebar {
  label: string
  path?: string
  icon?: JSX.Element
  dropDown?: Array<LinkSidebar>
}

const routes: Array<LinkSidebar> = [
  { label: 'Call center', dropDown: [{
    label: 'Usuarios', path: '/call-center/users'
  }] },
  { label: 'Administradores', path: '/administrators'}
]

const ExpansionPanel = withStyles({
  root: {
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  content: {
    '&$expanded': {
      margin: 0
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary)

const useStyles = makeStyles(({ palette, spacing }: Theme ) => ({
  containerSidebar: {
    width: '100%',
    height: '100%',
    backgroundColor: palette.primary.main
  },
  containerLogo: {
    height: 120
  },
  logo: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    objectPosition: 'center',
    backgroundColor: palette.primary.main
  },
  expansionPanel: {
    backgroundColor: palette.primary.main,
    '&:hover': {
      backgroundColor: palette.primary.dark
    }
  },
  panelSummary: {
    color: palette.common.white
  },
  panelDetail: {
 
  },
  expandIcon: {
    color: palette.common.white
  },
  linkNested: {
    textDecoration: 'none',
    display: 'block',
    width: '100%',
    color: palette.common.white 
  },
  linkRoute: {
    padding: `0 ${spacing(2)}px`,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    color: palette.common.white,
    minHeight: 48,
    '&:hover': {
      backgroundColor: palette.primary.dark
    }
  },
  activeLink: {
    backgroundColor: palette.primary.dark
  }
}), { name: 'Sidebar' })

const Sidebar: FunctionComponent = (): JSX.Element => {
  const classes = useStyles()
  const { pathname } = useLocation()
  const [ expanded, setExpanded ] = useState<string | false>(false)
  const [ selected, setSelected ] = useState<number | null>(null)

  const handlerExpanded = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  }

  return (
    <div className={classes.containerSidebar}>
      <div className={classes.containerLogo}>
        <img className={classes.logo} src="https://gglassday.com/wp-content/uploads/2017/12/Airbnb-new-logo-2014-compressor.png" alt="Logo" />
      </div>
      { routes.length ? routes.map(({ label, path, dropDown }, indexI) => {
        return path && !dropDown?.length ? (
          <Link to={path} onClick={() => selected !== null && setSelected(null)} key={label} className={clsx([classes.linkRoute, pathname === path && classes.activeLink])}><Typography variant="body1">{label}</Typography></Link>
        ) : (
          <ExpansionPanel key={label} className={clsx([classes.expansionPanel, indexI === selected && classes.activeLink])} square expanded={expanded === 'panel1'} onChange={handlerExpanded('panel1')}>
            <ExpansionPanelSummary
              className={classes.panelSummary}
              expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
              aria-controls="panel1d-content" id="panel1d-header">
              <Typography>{label}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.panelDetail}>
                {dropDown?.length ? dropDown.map(({ label, path = '/dashboard' }) => {
                  pathname === path && selected === null && setSelected(indexI) 
                  return <Link key={label} to={path} className={classes.linkNested}>{label}</Link>
                }) : null }
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
      }) : null}
    </div>
  )
}

export default Sidebar