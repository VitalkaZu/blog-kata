import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useLoginUserMutation } from '../redux'
import { emailField, passwordField } from '../components/UserForm/templatesField'
import UserForm from '../components/UserForm'

function SignIn() {
  const navigate = useNavigate()
  const location = useLocation()
  const [errors, setErrors] = useState()
  const fromPage = location.state?.from?.pathname || '/'

  const [registerUser] = useLoginUserMutation()

  const onSubmit = async (data) => {
    try {
      await registerUser({
        user: {
          email: data.email,
          password: data.password,
        },
      }).unwrap()
      navigate(fromPage, { replace: true })
    } catch (err) {
      if (err.status === 422) {
        setErrors({
          email: 'email or password is invalid',
          password: 'email or password is invalid',
        })
      }
    }
  }

  const template = {
    title: 'Sign In',
    fields: [emailField, passwordField],
    submitLabel: 'Login',
    footer: (
      <>
        Don’t have an account? <Link to="/sign-up">Sign Up</Link>.
      </>
    ),
  }

  return (
    <UserForm template={template} onSubmit={(data) => onSubmit(data)} errorsProps={errors} />
  )
}

export default SignIn
