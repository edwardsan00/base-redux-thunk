
import React, { FunctionComponent, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles, Grid, Theme } from '@material-ui/core'
import { RootState } from 'reducers'
import { getUser } from 'reducers/userDucks'
import Header from 'components/Common/Header'
import Sidebar from 'components/Sidebar'

const useStyles = makeStyles(({ palette }: Theme ) => ({
  containerAdmin: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
    minWidth: 900,
    maxWidth: '100%',
    backgroundColor: palette.grey[100]
  },
  containerWrapper: {
    width: '100%',
    height: '100%'
  },
  containerBox: {
    width: 'calc(100% - 40px)',
    margin: '20px auto',
    overflow: 'auto',
  }
}))

const Admin: FunctionComponent = ({ children }): JSX.Element => {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const { user: { id: userId, first_name, last_name, avatar } } = useSelector((state: RootState) => state.user) 
  useEffect(() => {
    const localLogin = localStorage.getItem('isLogin')
    const isLogin =  localLogin ? JSON.parse(localLogin) : ''
    if (isLogin){
      if(!userId)
        dispatch(getUser())
    } else {
      history.push(location.pathname.replace('dashboard', 'login'))
    }
  }, [dispatch, history, location.pathname, userId])

  return (
    <div className={classes.containerAdmin}>
      <Grid container className={classes.containerWrapper}>
        <Grid item xs={3} lg={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={9} lg={10}>
          <Header first_name={first_name} last_name={last_name} avatar={avatar} />
          <div className={classes.containerBox}>
            {children}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

Admin.propTypes = {
  children: PropTypes.node.isRequired
}

export default Admin