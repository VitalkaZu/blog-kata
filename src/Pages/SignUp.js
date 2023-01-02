import React, { useState } from 'react'
// import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
// import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { setUser } from '../redux/slices/userSlice'
// import s from './SignUp.module.scss'
import { useRegisterUserMutation } from '../redux'
import {
  usernameField,
  emailField,
  passwordField,
  confirmPasswordField,
  argeeCheckBoxField,
} from '../components/UserForm/templatesField'
import UserForm from '../components/UserForm'

function SignUp() {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState()

  const [registerUser] = useRegisterUserMutation()

  const onSubmit = (data) => {
    console.log(data)
    registerUser({
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    })
      .unwrap()
      .then((res) => dispatch(setUser(res.data)))
      .catch((e) => {
        setErrors(e.data.errors)
        console.log(e)
      })
  }

  const template = {
    title: 'Create new account',
    fields: [usernameField, emailField, passwordField, confirmPasswordField, argeeCheckBoxField],
    submitLabel: 'Create',
    footer: (
      <>
        Already have an account? <Link to="/sign-in">Sign In</Link>.
      </>
    ),
  }
  return <UserForm template={template} onSubmit={(data) => onSubmit(data)} errorsProps={errors} />
}

export default SignUp
