/* eslint-disable indent,react/jsx-indent */
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
// import { useNavigate } from 'react-router-dom'
import s from './ArticleForm.module.scss'

function ArticleForm({ title, article, onSubmit }) {
  const [newTag, setNewTag] = useState()
  const [tags = [], setTags] = useState()

  const addTag = (tag) => {
    setTags([...tags, tag])
    // console.log('add tag >>>', tag)
  }

  const deleteTag = (tag) => {
    const remainingTags = tags.filter((t) => t !== tag)
    setTags([...remainingTags])
    // console.log('delete tag >>>', tag)
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
    setValue,
    // watch,
    // setError,
    // getValues,
    // reset,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (article) {
      const { tagList = [], title: titleArticle, description, body } = article
      setValue('title', titleArticle)
      setValue('description', description)
      setValue('body', body)
      setTags(tagList)
    }
  }, [article])

  const onSubmitForm = (data) => {
    onSubmit(data, tags)
    // try {
    //   const newArticle = await addArticle({
    //     article: {
    //       ...data,
    //       // title: data.title,
    //       // description: data.description,
    //       // body: data.body,
    //       tagList: tags,
    //     },
    //   }).unwrap()
    //   console.log(newArticle)
    //   navigate(`/articles/${newArticle.article.slug}`)
    // } catch (err) {
    //   console.log(err)
    //   // setErrors(err.data.errors)
    //   // if (!err) {
    //   //   console.log(err)
    //   //   setErrors(err.data.errors)
    //   // }
    // }
  }

  const renderTagsInput = (arrTag) => (
    <>
      {arrTag
        ? arrTag.map((tag) => (
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
          ))
        : null}

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
