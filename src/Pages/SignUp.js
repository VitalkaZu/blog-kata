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
  // const { token } = useSelector((state) => state.userReducer)
  // console.log(token)

  // const {
  //   register,
  //   handleSubmit,
  //   // watch,
  //   // getValues,
  //   reset,
  //   formState: { errors },
  // } = useForm({
  //   mode: 'onTouched',
  //   resolver: yupResolver(formSchema),
  // })

  const [registerUser] = useRegisterUserMutation()

  // useEffect(() => {
  //   if (result.data) {
  //     dispatch(
  //       setUser({
  //         token: result.data.user.token,
  //         email: result.data.user.email,
  //         username: result.data.user.username,
  //       })
  //     )
  //     console.log(result.data.user.token)
  //   }
  // }, [result])

  // const onSubmit = (data) => {
  //   console.log(data)
  //   registerUser({
  //     user: {
  //       username: data.username,
  //       email: data.email,
  //       password: data.password,
  //     },
  //   })
  //   reset()
  // }
  //   return (
  //     <div className={`${s.card} wrapper`}>
  //       <h1>Create new account</h1>
  //       <form className={s.card__form} onSubmit={handleSubmit(onSubmit)}>
  //         <label className={s.card__label}>
  //           Username
  //           <input
  //             placeholder="Username"
  //             className={classNames(s.card__input, { [s.error]: errors.username })}
  //             {...register('username')}
  //           />
  //           <div className={s.card__error}>{errors?.username && <p>{errors?.username?.message}</p>}</div>
  //         </label>
  //         <label className={s.card__label}>
  //           Email address
  //           <input
  //             placeholder="Email address"
  //             className={classNames(s.card__input, { [s.error]: errors.email })}
  //             {...register('email')}
  //           />
  //           <div className={s.card__error}>{errors?.email && <p>{errors?.email?.message}</p>}</div>
  //         </label>
  //         <label className={s.card__label}>
  //           Password
  //           <input
  //             type="password"
  //             placeholder="Password"
  //             className={classNames(s.card__input, { [s.error]: errors.password })}
  //             {...register('password')}
  //           />
  //           <div className={s.card__error}>{errors?.password && <p>{errors?.password?.message}</p>}</div>
  //         </label>
  //         <label className={s.card__label}>
  //           Repeat Password
  //           <input
  //             type="password"
  //             placeholder="Repeat Password"
  //             className={classNames(s.card__input, { [s.error]: errors.cpassword })}
  //             {...register('cpassword')}
  //           />
  //           <div className={s.card__error}>{errors?.cpassword && <p>{errors?.cpassword?.message}</p>}</div>
  //         </label>
  //         <label className={s.card__checkbox}>
  //           <input
  //             type="checkbox"
  //             className={classNames(s.card__input, { [s.error]: errors.agree })}
  //             // className={s.card__input}
  //             {...register('agree')}
  //           />
  //           I agree to the processing of my personal information
  //         </label>
  //         <div className={s.card__error}>{errors?.agree && <p>{errors?.agree?.message}</p>}</div>
  //         <input className={s.card__submit} type="submit" />
  //       </form>
  //       <p className={s.card__footer}>
  //         Already have an account? <Link to="/sign-in">Sign In</Link>.
  //       </p>
  //     </div>
  //   )
  // }

  // const dispatch = useDispatch()

  // const [registerUser] = useLoginUserMutation()

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
    submitLabel: 'Login',
    footer: (
      <>
        Already have an account? <Link to="/sign-in">Sign In</Link>.
      </>
    ),
  }
  return <UserForm template={template} onSubmit={(data) => onSubmit(data)} errorsProps={errors} />
}

export default SignUp

// username(pin):"vitalka"
// email(pin):"vvv@vvv.ru"
// pass '123456'
