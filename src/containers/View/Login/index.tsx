import React, { FunctionComponent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { RootState } from 'reducers'
import { makeStyles, Typography, Button, FormControl, OutlinedInput, Theme, FormHelperText } from '@material-ui/core'
import { getUser } from 'reducers/userDucks'

interface Login {
  user: string
  password: string
}

const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  containerLogin: {
    width: '100%',
    height: '100vh',
    position: 'relative',
    '&:before': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      backgroundImage: 'linear-gradient(rgba(0,0,0,.7), rgba(0,0,0, .7));'
    }
  },
  backgroundLogin: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center'
  },
  containerForm: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'calc(100% - 20px)',
    maxWidth: 550,
    padding: '45px',
    backgroundColor: 'white',
    borderRadius: 4
  },
  containerInputs: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: spacing(3)
  },
  inputLogin: {
    marginBottom: spacing(2)
  },
  buttonLogin: {
    marginTop: spacing(3)
  },
  helpText: {
    marginLeft: 0,
    color: palette.error.main
  }
}))

const Login: FunctionComponent = (): JSX.Element => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const { status, user } = useSelector((state: RootState) => state.user)
  const { register, handleSubmit, errors } = useForm<Login>()

  const onSubmit = handleSubmit(({ password, user }) => {
    console.log("onSubmit -> password", password)
    console.log("onSubmit -> user", user)
    dispatch(getUser())
  })

  useEffect(() => {
    if(status === 'READY' && user.id){
      localStorage.setItem('isLogin', JSON.stringify(true))
      history.push(location.pathname.replace('login', 'dashboard'))
    }
  })

  return (
    <div className={classes.containerLogin}>
      <img 
        className={classes.backgroundLogin}
        src="https://images.unsplash.com/photo-1554252116-ee59370d1f66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1649&q=80" 
        alt="Login" />
      <form onSubmit={onSubmit} className={classes.containerForm}>
        <Typography align="center" variant="h5">Panel de Administración</Typography>
        <Typography align="center" variant="body1">Ingreso al sistema</Typography>
        <div className={classes.containerInputs}>
          <FormControl className={classes.inputLogin} variant="outlined">
            <OutlinedInput
              error={Boolean(errors?.user?.message)}
              name="user"
              inputRef={register({
                required: {
                  value: true,
                  message: 'Por favor ingrese su correo electronico'
                },
                pattern: {
                  value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
                  message: 'Debe ser un correo electronico'
                }
              })}
              margin="dense"
              type="text"
              placeholder="Usuario" />
            {errors?.user ? <FormHelperText className={classes.helpText}>{errors.user.message}</FormHelperText> : null}
          </FormControl>
          <FormControl className={classes.inputLogin} variant="outlined">
            <OutlinedInput
              name="password"
              inputRef={register({
                required: {
                  value: true,
                  message: 'Por favor ingrese su contraseña'
                }
              })}
              error={Boolean(errors?.password?.message)}
              margin="dense"
              type="password"
              placeholder="Contraseña"
            />
            { errors?.password ? <FormHelperText className={classes.helpText}>{errors.password.message}</FormHelperText> : null }
          </FormControl>
          <Button
            type="submit"
            className={classes.buttonLogin} 
            variant="contained" 
            color="primary">Iniciar Sesión</Button>
        </div>
      </form>
    </div>
  )
}

export default Login


