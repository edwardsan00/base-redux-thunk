import React, { FunctionComponent, useRef } from 'react'
import { 
  makeStyles, 
  Grid,
  FormControl,
  Typography,
  OutlinedInput,
  FormHelperText,
  Theme,
  Button
} from '@material-ui/core'
import { User } from 'reducers/userDucks'
import { useForm } from 'react-hook-form'
import HeaderSection from 'components/Common/HeaderSection'
import { useSelector } from 'react-redux'
import { RootState } from 'reducers'

const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  containerProfile: {
    borderRadius: 4,
    backgroundColor: palette.common.white,
    width: '100%',
    padding: spacing(2)
  },
  input: {
    width: '100%',
    marginBottom: spacing(2),
    paddingLeft: spacing(1),
    paddingRight: spacing(1)
  },
  labelForm: {
    marginBottom: spacing(1)
  },
  helpText: {
    marginLeft: 0,
    color: palette.error.main
  },
  button: {
    marginRight: spacing(1),
    '&:last-child': {
      marginRight: 0
    }
  }
}), { name: 'Profile' })

const Profile: FunctionComponent = (): JSX.Element => {
  const classes = useStyles()
  const formLogin = useRef<HTMLFormElement>(null)
  const { user } = useSelector((state: RootState) => state.user)
  const { register, errors, handleSubmit } = useForm<User>()

  const onSubmit = handleSubmit(({ first_name, last_name, email }) => {
    console.log("onSubmit -> email", email)
    console.log("onSubmit -> last_name", last_name)
    console.log("onSubmit -> first_name", first_name)
  })

  return (
    <div>
      <HeaderSection title="Perfil" />
      <Grid component='form' ref={formLogin} onSubmit={onSubmit} container className={classes.containerProfile}>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.input} variant="outlined">
            <Typography variant='body2' className={classes.labelForm}>First name</Typography>
            <OutlinedInput
              defaultValue={user.first_name}
              name="first_name"
              error={Boolean(errors?.first_name?.message)}
              inputRef={register({
                required: {
                  value: true,
                  message: 'Por favor ingrese su nombre'
                }
              })}
              margin="dense"
              type="text" />
            {errors?.first_name ? <FormHelperText className={classes.helpText}>{errors.first_name.message}</FormHelperText> : null}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.input} variant="outlined">
            <Typography variant='body2' className={classes.labelForm}>Last name</Typography>
            <OutlinedInput
              defaultValue={user.last_name}
              name="last_name"
              error={Boolean(errors?.last_name?.message)}
              inputRef={register({
                required: {
                  value: true,
                  message: 'Por favor ingrese su apellido'
                }
              })}
              margin="dense"
              type="text"/>
            {errors?.last_name ? <FormHelperText className={classes.helpText}>{errors.last_name.message}</FormHelperText> : null}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.input} variant="outlined">
            <Typography variant='body2' className={classes.labelForm}>Email</Typography>
            <OutlinedInput
              defaultValue={user.email}
              name="email"
              error={Boolean(errors?.email?.message)}
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
              type="email" />
            {errors?.email ? <FormHelperText className={classes.helpText}>{errors.email.message}</FormHelperText> : null}
          </FormControl>
        </Grid>
        <Grid item xs={12} container justify="center">
            <Button className={classes.button} type="submit" color="primary" variant="contained">Actualizar</Button>
            <Button className={classes.button} onClick={() => formLogin.current?.reset()} type="reset" color="secondary" variant="outlined">Cancelar</Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default Profile