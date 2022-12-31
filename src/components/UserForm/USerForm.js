/* eslint-disable indent */
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
// import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import s from './SignUp.module.scss'
// import { useRegisterUserMutation } from '../../redux'

function UserForm({ template, onSubmit, errorsProps, valuesProps }) {
  const { title, fields, submitLabel, footer } = template
  // console.log(valuesProps)
  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    // getValues,
    // reset,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  })

  const onSubmitForm = (data) => {
    // console.log(data)
    onSubmit(data)
    // reset()
  }

  useEffect(() => {
    if (errorsProps) {
      const arrErrorProps = Object.entries(errorsProps)
      arrErrorProps.forEach(([name, message]) => setError(name, { type: 'manual', message }))
    }
  }, [errorsProps])
  useEffect(() => {
    if (valuesProps) {
      const arrvaluesProps = Object.entries(valuesProps)
      arrvaluesProps.forEach(([name, val]) => setValue(name, val))
    }
  }, [valuesProps])

  const renderFields = (arrFields) => arrFields.map((field, index) => {
      const { label, name, type, placeholder, validationProps, matchField } = field

      switch (type) {
        case 'text':
        case 'email':
        case 'password':
        case 'url':
          return (
            <label key={index} className={s.card__label}>
              {label}
              <input
                // key={name}
                type={type}
                placeholder={placeholder}
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
              <label key={index} className={s.card__checkbox}>
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
            <div key={index}>
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
