/* eslint-disable indent */
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
// import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import s from './SignUp.module.scss'
// import { useRegisterUserMutation } from '../../redux'

function UserForm({ template, onSubmit, errorsProps }) {
  const { title, fields, submitLabel, footer } = template

  const {
    register,
    handleSubmit,
    watch,
    setError,
    // getValues,
    // reset,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  })

  const onSubmitForm = (data) => {
    console.log(data)
    onSubmit(data)
    // reset()
  }

  useEffect(() => {
    if (errorsProps) {
      const arrErrorProps = Object.entries(errorsProps)
      arrErrorProps.forEach(([name, message]) => setError(name, { type: 'manual', message }))
    }
  }, [errorsProps])

  const renderFields = (arrFields) => arrFields.map((field) => {
      const { label, name, type, placeholder, validationProps, matchField, value } = field

      switch (type) {
        case 'text':
        case 'email':
        case 'password':
        case 'url':
          return (
            <label className={s.card__label}>
              {label}
              <input
                type={type}
                placeholder={placeholder}
                value={value}
                className={classNames(s.card__input, { [s.error]: errors[name] })}
                {...register(
                  name,
                  matchField
                    ? {
                        ...validationProps,
                        validate: (val) => val === watch(matchField.nameField) || matchField.messageError,
                      }
                    : validationProps
                )}
              />
              <div className={s.card__error}>{errors?.[name] && <p>{errors?.[name].message}</p>}</div>
            </label>
          )
        case 'checkbox':
          return (
            <>
              <label className={s.card__checkbox}>
                <input
                  type="checkbox"
                  className={classNames(s.card__input, { [s.error]: errors[name] })}
                  // className={s.card__input}
                  {...register(name, validationProps)}
                />
                {label}
              </label>
              <div className={s.card__error}>{errors?.[name] && <p>{errors?.[name].message}</p>}</div>
            </>
          )
        default:
          return (
            <div>
              <span>Invalid field</span>
            </div>
          )
      }
    })

  return (
    <div className={`${s.card} wrapper`}>
      <h1>{title}</h1>
      <form className={s.card__form} onSubmit={handleSubmit(onSubmitForm)}>
        {renderFields(fields)}
        <input className={s.card__submit} value={submitLabel} type="submit" />
      </form>
      {footer && <p className={s.card__footer}>{footer}</p>}
    </div>
  )
}

export default UserForm

// username(pin):"vitalka"
// email(pin):"vvv@vvv.ru"
// pass '123456'
