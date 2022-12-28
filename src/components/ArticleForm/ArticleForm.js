/* eslint-disable indent,react/jsx-indent */
import React, { useState } from 'react'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAddArticleMutation } from '../../redux'
import s from './ArticleForm.module.scss'

function ArticleForm({ title, article }) {
  console.log(article)
  const navigate = useNavigate()
  const [addArticle] = useAddArticleMutation()
  const [newTag, setNewTag] = useState()
  const [tags, setTags] = useState(['hello', 'second tag'])

  const addTag = (tag) => {
    setTags([...tags, tag])
    console.log('add tag >>>', tag)
  }

  const deleteTag = (tag) => {
    const remainingTags = tags.filter((t) => t !== tag)
    setTags([...remainingTags])
    console.log('delete tag >>>', tag)
  }

  const handleAddTag = () => {
    addTag(newTag)
    setNewTag('')
  }

  // const updateTag = (tag, newValue) => {
  //   const index = tags.indexOf(tag)
  //   const before = tag.slice(0, index)
  //   const after = tag.slice(index + 1)
  //   setTags(...before, newValue, ...after)
  //   console.log('update tag >>>', tag)
  // }

  const {
    register,
    handleSubmit,
    // watch,
    // setError,
    // getValues,
    // reset,
    formState: { errors },
  } = useForm()

  const onSubmitForm = async (data) => {
    console.log(data, tags)
    try {
      const newArticle = await addArticle({
        article: {
          ...data,
          // title: data.title,
          // description: data.description,
          // body: data.body,
          tagList: tags,
        },
      }).unwrap()
      console.log(newArticle)
      navigate(`/articles/${newArticle.article.slug}`)
    } catch (err) {
      console.log(err)
      // setErrors(err.data.errors)
      // if (!err) {
      //   console.log(err)
      //   setErrors(err.data.errors)
      // }
    }
  }

  // {
  //   "article": {
  //   "title": "string",
  //     "description": "string",
  //     "body": "string",
  //     "tagList": [
  //     "string"
  //   ]
  // }
  // }

  const renderTagsInput = (arrTag) => (
    <>
      {arrTag.map((tag) => (
        <li className={s.itemTags}>
          <input
            placeholder="Tag"
            value={tag}
            disabled
            className={classNames(s.card__input, { [s.error]: errors.body })}
            // onChange={(e) => updateTag(tag, e.target.value)}
          />
          <button className={s.deleteBtn} type="button" onClick={() => deleteTag(tag)}>
            Delete
          </button>
        </li>
      ))}
      <li className={s.itemTags}>
        <input
          placeholder="Tag"
          className={classNames(s.card__input, { [s.error]: errors.body })}
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        <button className={s.deleteBtn} type="button">
          Delete
        </button>
        <button className={s.addBtn} type="button" onClick={handleAddTag}>
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
