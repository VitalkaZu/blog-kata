/* eslint-disable indent,react/jsx-indent */
import React, { useEffect } from 'react'
import classNames from 'classnames'
import { useForm, useFieldArray } from 'react-hook-form'
import s from './ArticleForm.module.scss'

function ArticleForm({ title, article, onSubmit }) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    setFocus,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tagList: article?.tagList,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  })

  useEffect(() => {
    if (article) {
      const { title: titleArticle, description, body } = article
      setValue('title', titleArticle)
      setValue('description', description)
      setValue('body', body)
    }
  }, [article])

  const onSubmitForm = (data) => {
    const { tagList, lastTag, ...fl } = data
    const newFields = {
      ...fl,
      tagList: lastTag ? [...tagList, lastTag] : tagList,
    }
    onSubmit(newFields)
  }

  return (
    <div className={`${s.card} wrapper`}>
      <h1>{title}</h1>
      <form className={s.card__form} onSubmit={handleSubmit(onSubmitForm)}>
        <label className={s.card__label}>
          Title
          <input
            type="text"
            placeholder="Title"
            className={classNames(s.card__input, { [s.error]: errors.title })}
            {...register('title', { required: { value: true, message: 'Title is required' } })}
          />
          <div className={s.card__error}>{errors?.title && <p>{errors?.title.message}</p>}</div>
        </label>
        <label className={s.card__label}>
          Short description
          <input
            type="text"
            placeholder="Short description"
            className={classNames(s.card__input, { [s.error]: errors.description })}
            {...register('description', { required: { value: true, message: 'Description is required' } })}
          />
          <div className={s.card__error}>{errors?.description && <p>{errors?.description.message}</p>}</div>
        </label>
        <label className={s.card__label}>
          Text
          <textarea
            placeholder="Text"
            rows={6}
            className={classNames(s.card__input, s.card__textarea, { [s.error]: errors.body })}
            {...register('body', { required: { value: true, message: 'Text is required' } })}
          />
          <div className={s.card__error}>{errors?.body && <p>{errors?.body.message}</p>}</div>
        </label>
        <ul className={s.card__label}>
          Tags
          {fields.map((item, index) => (
            <li key={item.id} className={s.itemTags}>
              <input
                placeholder="Tag"
                className={classNames(s.card__input, { [s.error]: errors?.test?.[index]?.tag })}
                {...register(`tagList.${index}`, { required: { value: true, message: 'enter tag or delete' } })}
              />
              <button type="button" className={s.deleteBtn} onClick={() => remove(index)}>
                Delete
              </button>
              <div className={s.card__error}>
                {errors?.tagList?.[index] && <p>{errors?.tagList?.[index]?.message}</p>}
              </div>
            </li>
          ))}
          <li className={s.itemTags}>
            <input
              placeholder="Tag"
              className={s.card__input}
              {...register('lastTag')}
            />
            <button
              className={s.addBtn}
              type="button"
              onClick={async () => {
                await append(getValues('lastTag'))
                setValue('lastTag', '')
                setFocus('lastTag')
              }}
            >
              Add tag
            </button>
          </li>
        </ul>
        <input className={s.card__submit} value="Send" type="submit" />
      </form>
    </div>
  )
}

export default ArticleForm
