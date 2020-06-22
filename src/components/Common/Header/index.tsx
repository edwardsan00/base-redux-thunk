import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { makeStyles, Box, AppBar, Toolbar, Typography, Avatar, Theme, 
  MenuItem, ListItemIcon, ListItemText 
} from '@material-ui/core'
import { 
  ExpandMore as ExpandMoreIcon,
  Person as PersonIcon,
  ExitToApp as ExitToAppIcon
} from '@material-ui/icons'
import { User } from 'reducers/userDucks'

const useStyles = makeStyles(({ palette, zIndex }: Theme) => ({
  appBar: {
    backgroundColor: palette.common.white,
    borderBottom: `solid 1px ${palette.grey[300]}`
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  menu: {
    cursor: 'pointer',
    position: 'relative',
    '&:hover': {
      '& $menuHover': {
        display: 'flex'
      }
    }
  },
  menuHover: {
    display: 'none',
    position: 'absolute',
    top: 40,
    zIndex: zIndex.appBar,
    right: 0,
    flexDirection: 'column',
    backgroundColor: palette.common.white,
    boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)'
  },
  menuItem: {
    color: palette.common.black,
  }
}))

type HeaderProps = Omit<User, 'email' | 'id'>

const Header: FunctionComponent<HeaderProps> = ({ first_name, last_name, avatar }): JSX.Element => {
  const classes = useStyles()
  const history = useHistory()

  const handlerLogOut = () => {
    localStorage.removeItem('isLogin')
    history.push('/login')
  }

  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar className={classes.toolBar}>
        <Box display='flex' alignItems='center'>
          <Box marginX={1}>
            <Typography color="textSecondary" align="right" variant="body2">Bienvenido</Typography>
            <Typography color="textPrimary" align="right" variant="body2">{`${first_name} ${last_name}`}</Typography>
          </Box>
          <Box display='flex' className={classes.menu} alignItems='center'>
            <Avatar variant="rounded" src={avatar} />
            <ExpandMoreIcon color="action" />
            <div className={classes.menuHover}>
              <MenuItem  className={classes.menuItem} onClick={() => history.push('/profile')}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Editar perfil" />
              </MenuItem>
              <MenuItem  className={classes.menuItem}  onClick={handlerLogOut}>
                <ListItemIcon>
                  <ExitToAppIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Cerrar sesión" />
              </MenuItem>
            </div>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired
}

export default Header