import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const [errors, setErrors] = useState()
  const location = useLocation()
  const fromPage = location.state?.from?.pathname || '/'

  const [registerUser] = useRegisterUserMutation()

  const onSubmit = async (data) => {
    try {
      await registerUser({
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      }).unwrap()
      navigate(fromPage, { replace: true })
    } catch (err) {
      if (err.status === 422) {
        setErrors(err.data.errors)
      }
    }
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
