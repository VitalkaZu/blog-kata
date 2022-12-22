import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { setUser } from '../../redux/slices/userSlice'
import s from './SignUp.module.scss'
import { useLoginUserMutation } from '../../redux'
// import { useAuth } from '../../hooks/useAuth'

function SignIn() {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.userReducer)
  console.log(token)
  const formSchema = yup.object().shape({
    email: yup.string().required('Email is required').email('Put your email'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password length should be at least 6 characters')
      .max(40, 'Password cannot exceed more than 40 characters'),
  })

  const {
    register,
    handleSubmit,
    // watch,
    // getValues,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
  })

  const [registerUser, result] = useLoginUserMutation()

  useEffect(() => {
    if (result.data) {
      dispatch(
        setUser(
          result.data
        )
      )
      console.log(result.data.user.token)
    }
  }, [result])

  const onSubmit = (data) => {
    console.log(data)
    registerUser({
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    })
    reset()
  }
  return (
    <div className={`${s.card} wrapper`}>
      <h1>Sign In</h1>
      <form className={s.card__form} onSubmit={handleSubmit(onSubmit)}>
        <label className={s.card__label}>
          Email address
          <input
            placeholder="Email address"
            className={classNames(s.card__input, { [s.error]: errors.email })}
            {...register('email')}
          />
          <div className={s.card__error}>{errors?.email && <p>{errors?.email?.message}</p>}</div>
        </label>
        <label className={s.card__label}>
          Password
          <input
            type="password"
            placeholder="Password"
            className={classNames(s.card__input, { [s.error]: errors.password })}
            {...register('password')}
          />
          <div className={s.card__error}>{errors?.password && <p>{errors?.password?.message}</p>}</div>
        </label>
        <input className={s.card__submit} type="submit" />
      </form>
      <p className={s.card__footer}>
        Don’t have an account? <Link to="/sign-up">Sign Up</Link>.
      </p>
    </div>
  )
}

export default SignIn

// username(pin):"vitalka"
// email(pin):"vvv@vvv.ru"
// pass '123456'
