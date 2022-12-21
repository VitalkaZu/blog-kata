import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import classNames from 'classnames'
import s from './SignUp.module.scss'

function SignUp() {
  const formSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required')
      .min(3, 'Username length should be at least 3 characters')
      .max(20, 'Username cannot exceed more than 20 characters'),
    email: yup.string().required('Email is required').email('Put your email'),
    password: yup
      .string()
      .required('Password is required')
      .min(4, 'Password length should be at least 4 characters')
      .max(12, 'Password cannot exceed more than 12 characters'),
    cpassword: yup
      .string()
      .required('Confirm Password is required')
      .min(4, 'Password length should be at least 4 characters')
      .max(12, 'Password cannot exceed more than 12 characters')
      .oneOf([yup.ref('password')], 'Passwords do not match'),
    agree: yup
      .bool()
      .oneOf([true], 'You mast agree')
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

  const onSubmit = (data) => {
    console.log(data)
    reset()
  }
  return (
    <div className={`${s.card} wrapper`}>
      <h1>Create new account</h1>
      <form className={s.card__form} onSubmit={handleSubmit(onSubmit)}>
        <label className={s.card__label}>
          Username
          <input
            placeholder="Username"
            className={classNames(s.card__input, { [s.error]: errors.username })}
            {...register('username')}
          />
          <div className={s.card__error}>{errors?.username && <p>{errors?.username?.message}</p>}</div>
        </label>
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
        <label className={s.card__label}>
          Repeat Password
          <input
            type="password"
            placeholder="Repeat Password"
            className={classNames(s.card__input, { [s.error]: errors.cpassword })}
            {...register('cpassword')}
          />
          <div className={s.card__error}>
            {errors?.cpassword && <p>{errors?.cpassword?.message}</p>}
          </div>
        </label>
        <label className={s.card__checkbox}>
          <input
            type="checkbox"
            placeholder="agree"
            // className={s.card__input}
            {...register('agree')}
          />
          I agree to the processing of my personal information
        </label>
        <div className={s.card__error}>{errors?.agree && <p>{errors?.agree?.message}</p>}</div>
        <input className={s.card__submit} type="submit" />
      </form>
    </div>
  )
}

export default SignUp
