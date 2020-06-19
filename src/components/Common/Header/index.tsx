import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'
// import { useHistory } from 'react-router-dom'
import { makeStyles, Box, AppBar, Toolbar, Typography, Avatar, Theme, 
  // Menu, MenuItem, ListItemIcon, ListItemText 
} from '@material-ui/core'
import { 
  ExpandMore as ExpandMoreIcon
  // Person as PersonIcon,
  // ExitToApp as ExitToAppIcon
} from '@material-ui/icons'
import { User } from 'reducers/userDucks'

const useStyles = makeStyles(({ palette }: Theme) => ({
  appBar: {
    backgroundColor: palette.common.white,
    borderBottom: `solid 1px ${palette.grey[300]}`
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  menu: {
    cursor: 'pointer'
  }
}))

type HeaderProps = Omit<User, 'email' | 'id'>

const Header: FunctionComponent<HeaderProps> = ({ first_name, last_name, avatar }): JSX.Element => {
  const classes = useStyles()
  // const history = useHistory()
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget)
  // }

  // const handleClose = () => {
  //   setAnchorEl(null)
  // }

  // const handlerLogOut = () => {
  //   localStorage.removeItem('isLogin')
  //   history.push('/login')
  // }

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
            {/* { Boolean(anchorEl) ? (
              <Menu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => history.push('/profile')}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Editar perfil" />
                </MenuItem>
                <MenuItem onClick={handlerLogOut}>
                  <ListItemIcon>
                    <ExitToAppIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Cerrar sesión" />
                </MenuItem>
              </Menu>
            ) : null} */}
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