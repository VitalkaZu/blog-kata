import React from 'react'
import { useForm } from 'react-hook-form'
// import { useDispatch } from 'react-redux'
// import { yupResolver } from '@hookform/resolvers/yup'
// import * as yup from 'yup'
// import classNames from 'classnames'
// import { Link } from 'react-router-dom'
// import { setUser } from '../../redux/slices/userSlice'
import s from './SignUp.module.scss'
// import { useRegisterUserMutation } from '../../redux'

function UserForm({ template }) {
  const { title, fields, footer } = template
  console.log(fields)
  // const dispatch = useDispatch()
  // const { token } = useSelector((state) => state.userReducer)
  // const formSchema = yup.object().shape({
  //   username: yup
  //     .string()
  //     .required('Username is required')
  //     .min(3, 'Username length should be at least 3 characters')
  //     .max(20, 'Username cannot exceed more than 20 characters'),
  //   email: yup.string().required('Email is required').email('Put your email'),
  //   password: yup
  //     .string()
  //     .required('Password is required')
  //     .min(6, 'Password length should be at least 6 characters')
  //     .max(40, 'Password cannot exceed more than 40 characters'),
  //   cpassword: yup
  //     .string()
  //     .required('Confirm Password is required')
  //     .min(6, 'Password length should be at least 6 characters')
  //     .max(40, 'Password cannot exceed more than 40 characters')
  //     .oneOf([yup.ref('password')], 'Passwords do not match'),
  //   agree: yup.bool().oneOf([true], 'You mast agree'),
  // })

  const {
    register,
    handleSubmit,
    // watch,
    // getValues,
    // reset,
    // formState: { errors },
  } = useForm({
    mode: 'onTouched',
    // resolver: yupResolver(formSchema),
  })

  // const [registerUser, result] = useRegisterUserMutation()
  //
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
  //
  const onSubmit = (data) => {
    console.log(data)
    // registerUser({
    //   user: {
    //     username: data.username,
    //     email: data.email,
    //     password: data.password,
    //   },
    // })
    // reset()
  }

  const renderFields = (arrFields) => {
    arrFields.map((field) => {
      console.log(field)
      return (
        <label className={s.card__label}>
          {field.label}
          <input
            placeholder={field.placeholder}
            // className={classNames(s.card__input, { [s.error]: errors[field.name] })}
            {...register(field.name)}
          />
          {/* <div className={s.card__error}>{errors?.username && <p>{errors?.username?.message}</p>}</div> */}
        </label>
      )
    })
  }

  return (
    <div className={`${s.card} wrapper`}>
      <h1>{title}</h1>
      <form className={s.card__form} onSubmit={handleSubmit(onSubmit)}>
        {/* <label className={s.card__label}> */}
        {/*   Username */}
        {/*   <input */}
        {/*     placeholder="Username" */}
        {/*     className={classNames(s.card__input, { [s.error]: errors.username })} */}
        {/*     {...register('username')} */}
        {/*   /> */}
        {/*   <div className={s.card__error}>{errors?.username && <p>{errors?.username?.message}</p>}</div> */}
        {/* </label> */}
        {/* <label className={s.card__label}> */}
        {/*   Email address */}
        {/*   <input */}
        {/*     placeholder="Email address" */}
        {/*     className={classNames(s.card__input, { [s.error]: errors.email })} */}
        {/*     {...register('email')} */}
        {/*   /> */}
        {/*   <div className={s.card__error}>{errors?.email && <p>{errors?.email?.message}</p>}</div> */}
        {/* </label> */}
        {/* <label className={s.card__label}> */}
        {/*   Password */}
        {/*   <input */}
        {/*     type="password" */}
        {/*     placeholder="Password" */}
        {/*     className={classNames(s.card__input, { [s.error]: errors.password })} */}
        {/*     {...register('password')} */}
        {/*   /> */}
        {/*   <div className={s.card__error}>{errors?.password && <p>{errors?.password?.message}</p>}</div> */}
        {/* </label> */}
        {/* <label className={s.card__label}> */}
        {/*   Repeat Password */}
        {/*   <input */}
        {/*     type="password" */}
        {/*     placeholder="Repeat Password" */}
        {/*     className={classNames(s.card__input, { [s.error]: errors.cpassword })} */}
        {/*     {...register('cpassword')} */}
        {/*   /> */}
        {/*   <div className={s.card__error}>{errors?.cpassword && <p>{errors?.cpassword?.message}</p>}</div> */}
        {/* </label> */}
        {/* <label className={s.card__checkbox}> */}
        {/*   <input */}
        {/*     type="checkbox" */}
        {/*     className={classNames(s.card__input, { [s.error]: errors.agree })} */}
        {/*     // className={s.card__input} */}
        {/*     {...register('agree')} */}
        {/*   /> */}
        {/*   I agree to the processing of my personal information */}
        {/* </label> */}
        {/* <div className={s.card__error}>{errors?.agree && <p>{errors?.agree?.message}</p>}</div> */}
        {renderFields(fields)}
        <input className={s.card__submit} type="submit" />
      </form>
      {footer && <p className={s.card__footer}>{footer}</p>}
    </div>
  )
}

export default UserForm

// username(pin):"vitalka"
// email(pin):"vvv@vvv.ru"
// pass '123456'
