/* eslint-disable indent,react/jsx-indent */
import React, { useState } from 'react'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import s from './ArticleForm.module.scss'

function ArticleForm({ title, article }) {
  console.log(article)
  const [tags] = useState(['hello', 'second tag'])

  const {
    register,
    handleSubmit,
    // watch,
    // setError,
    // getValues,
    // reset,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  })

  const onSubmitForm = (data) => {
    console.log(data)
  }

  const renderTagsInput = (arrTag) => (
    <>
      {arrTag.map((tag) => (
        <li className={s.itemTags}>
          <input placeholder="Tag" value={tag} className={classNames(s.card__input, { [s.error]: errors.body })} />
          <button className={s.deleteBtn} type="button">
            Delete
          </button>
        </li>
      ))}
      <li className={s.itemTags}>
        <input placeholder="Tag" className={classNames(s.card__input, { [s.error]: errors.body })} />
        <button className={s.deleteBtn} type="button">
          Delete
        </button>
        <button className={s.addBtn} type="button">
          Add tag
        </button>
      </li>
    </>
  )

  return (
    <div className={`${s.card} wrapper`}>
      <h1>{title}</h1>
      <form className={s.card__form} onSubmit={handleSubmit(onSubmitForm)}>
        <label className={s.card__label}>
          Title
          <input
            type="text"
            placeholder="Title"
            // value={value}
            className={classNames(s.card__input, { [s.error]: errors.title })}
            {...register('title')}
          />
          <div className={s.card__error}>{errors?.title && <p>{errors?.title.message}</p>}</div>
        </label>
        <label className={s.card__label}>
          Short description
          <input
            type="text"
            placeholder="Short description"
            // value={value}
            className={classNames(s.card__input, { [s.error]: errors.title })}
            {...register('description')}
          />
          <div className={s.card__error}>{errors?.description && <p>{errors?.description.message}</p>}</div>
        </label>
        <label className={s.card__label}>
          Text
          <textarea
            placeholder="Text"
            rows={6}
            className={classNames(s.card__input, { [s.error]: errors.body })}
            {...register('body')}
          />
          {/* <input */}
          {/*   type="text" */}
          {/*   placeholder="Short description" */}
          {/*   // value={value} */}
          {/*   className={classNames(s.card__input, { [s.error]: errors.title })} */}
          {/*   {...register('description')} */}
          {/* /> */}
          <div className={s.card__error}>{errors?.description && <p>{errors?.description.message}</p>}</div>
        </label>
        <ul className={s.card__label}>
          Tags
          {renderTagsInput(tags)}
          {/* <li className={s.itemTags}> */}
          {/*   <input placeholder="Tag" className={classNames(s.card__input, { [s.error]: errors.body })} /> */}
          {/*   <button className={s.deleteBtn} type="button"> */}
          {/*     Delete */}
          {/*   </button> */}
          {/* </li> */}
        </ul>
        <input className={s.card__submit} value="Send" type="submit" />
      </form>
    </div>
  )
}

export default ArticleForm
