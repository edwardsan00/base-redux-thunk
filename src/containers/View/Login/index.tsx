import React, { FunctionComponent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'reducers'
import { getUsers } from 'reducers/userDucks'

const Login: FunctionComponent = (): JSX.Element => {
  const dispatch = useDispatch()
  const users = useSelector<RootState>(state => state.users) || {}
  console.log("users", users)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])
  return (
    <p>Login</p>
  )
}

export default Login