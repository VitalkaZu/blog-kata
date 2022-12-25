import React from 'react'
// import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { setUser } from '../redux/slices/userSlice'
// import s from './SignUp.module.scss'
import { useLoginUserMutation } from '../redux'
import { emailField, passwordField } from '../components/UserForm/templatesField'
import UserForm from '../components/UserForm'

function SignIn() {
  const navigate = useNavigate()
  const location = useLocation()
  const fromPage = location.state?.from?.pathname || '/'
  console.log(fromPage)
  const dispatch = useDispatch()

  const [registerUser] = useLoginUserMutation()

  const onSubmit = (data) => {
    console.log(data)
    registerUser({
      user: {
        email: data.email,
        password: data.password,
      },
    }).then((res) => {
      dispatch(setUser(res.data))
      navigate(fromPage, { replace: true })
    })
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
  return <UserForm template={template} onSubmit={(data) => onSubmit(data)} />
}

export default SignIn

// username(pin):"vitalka"
// email(pin):"vvv@vvv.ru"
// pass '123456'
