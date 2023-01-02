import React from 'react'
// import { useForm } from 'react-hook-form'
// import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
// import { message } from 'antd'
// import { setUser } from '../redux/slices/userSlice'
// import s from './SignUp.module.scss'
import { useLoginUserMutation } from '../redux'
import { emailField, passwordField } from '../components/UserForm/templatesField'
import UserForm from '../components/UserForm'
// import ErrorIndicator from '../components/UI/ErrorIndicator'

function SignIn() {
  // const navigate = useNavigate()
  const location = useLocation()
  // const [errors, setErrors] = useState()
  const fromPage = location.state?.from?.pathname || '/'
  console.log('location', location)
  console.log('from >> ', fromPage)
  // const dispatch = useDispatch()
  // const [messageApi, contextHolder] = message.useMessage()

  const [registerUser] = useLoginUserMutation()

  const onSubmit = (data) => {
    console.log(data)
    registerUser({
      user: {
        email: data.email,
        password: data.password,
      },
    })
      // .unwrap()
      .then((res) => {
        console.log('result >>>> ', res)
        // dispatch(setUser(res.data))
        // navigate(fromPage, { replace: true })
      })
      .catch((e) => {
        console.log('error >>>>', e)
      })
      // .catch((e) => {
      //   console.log(e)
      //   if (e.status === 422) {
      //     setErrors({
      //       email: 'email or password is invalid',
      //       password: 'email or password is invalid',
      //     })
      //   }
      // })
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

  // if (error) {
  //   console.log(error)
  //   messageApi.open({
  //     type: 'error',
  //     content: JSON.stringify(error.data),
  //   })
  //   // return <ErrorIndicator error={JSON.stringify(error.data)} />
  // }

  return (
    <>
      {/* {contextHolder} */}
      <UserForm template={template} onSubmit={(data) => onSubmit(data)} />
    </>
  )
}

export default SignIn

// username(pin):"vitalka"
// email(pin):"vvv@vvv.ru"
// pass '123456'
