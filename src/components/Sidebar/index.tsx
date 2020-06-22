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
}))

const Sidebar: FunctionComponent = (): JSX.Element => {
  const classes = useStyles()
  const location = useLocation()
  const [ expanded, setExpanded ] = useState<string | false>(false)
  const [ selected, setSelected ] = useState<number | null>(null)

  const handlerExpanded = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  }

  return (
    <div className={classes.containerSidebar}>
      <div className={classes.containerLogo}>

      </div>
      { routes.length ? routes.map(({ label, path, dropDown }, indexI) => {
        return path && !dropDown?.length ? (
          <Link to={path} key={label} className={clsx([classes.linkRoute, location.pathname === path && classes.activeLink])}><Typography variant="body1">{label}</Typography></Link>
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
                  location.pathname === path && selected === null && setSelected(indexI) 
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