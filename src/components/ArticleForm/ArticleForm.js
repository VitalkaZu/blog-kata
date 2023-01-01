/* eslint-disable indent,react/jsx-indent */
import React, { useEffect } from 'react'
import classNames from 'classnames'
import { useForm, useFieldArray } from 'react-hook-form'
// import { useNavigate } from 'react-router-dom'
import s from './ArticleForm.module.scss'

function ArticleForm({ title, article, onSubmit }) {
  // const [newTag, setNewTag] = useState()
  // const [tags = [], setTags] = useState()

  // const addTag = (tag) => {
  //   setTags([...tags, tag])
  //   // console.log('add tag >>>', tag)
  // }

  // const deleteTag = (tag) => {
  //   const remainingTags = tags.filter((t) => t !== tag)
  //   setTags([...remainingTags])
  //   // console.log('delete tag >>>', tag)
  // }
  //
  // const handleAddTag = () => {
  //   addTag(newTag)
  //   setNewTag('')
  // }

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
    control,
    // watch,
    // setError,
    setFocus,
    getValues,
    // reset,
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
    if (errors) {
      console.log(errors)
    }
  }, [errors])

  useEffect(() => {
    if (article) {
      const { title: titleArticle, description, body } = article
      setValue('title', titleArticle)
      setValue('description', description)
      setValue('body', body)
      // setTags(tagList)
    }
  }, [article])

  const onSubmitForm = (data) => {
    const { tagList, lastTag, ...fl } = data
    // const newFields = data.tagLast ? { ...data, tagList: [...data.tagList, { tag: data.lastTag }] } : data
    // const newObj = {
    //   title: data.title,
    //   taglist: Object.values(data.lastTag ? [...data.tagList, { tag: data.lastTag }] : data.tagList),
    // }
    const newFields = {
      ...fl,
      // tagList: (lastTag ? [...tagList, { tag: lastTag }] : tagList).map((item) => item.tag),
      tagList: lastTag ? [...tagList, lastTag] : tagList,
    }
    console.log('oldData', data)
    // console.log('newFields', newFields)
    console.log('newFields', newFields)
    onSubmit(newFields)
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

  // const renderTagsInput = (arrTag) => (
  //   <>
  //     {arrTag
  //       ? arrTag.map((tag) => (
  //           <li className={s.itemTags}>
  //             <input
  //               placeholder="Tag"
  //               value={tag}
  //               disabled
  //               className={classNames(s.card__input, { [s.error]: errors.body })}
  //               // onChange={(e) => updateTag(tag, e.target.value)}
  //             />
  //             <button className={s.deleteBtn} type="button" onClick={() => deleteTag(tag)}>
  //               Delete
  //             </button>
  //           </li>
  //         ))
  //       : null}
  //
  //     <li className={s.itemTags}>
  //       <input
  //         placeholder="Tag"
  //         className={classNames(s.card__input, { [s.error]: errors.body })}
  //         value={newTag}
  //         onChange={(e) => setNewTag(e.target.value)}
  //       />
  //       <button className={s.deleteBtn} type="button">
  //         Delete
  //       </button>
  //       <button className={s.addBtn} type="button" onClick={handleAddTag}>
  //         Add tag
  //       </button>
  //     </li>
  //   </>
  // )

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
            {...register('title', { required: { value: true, message: 'Title is required' } })}
          />
          <div className={s.card__error}>{errors?.title && <p>{errors?.title.message}</p>}</div>
        </label>
        <label className={s.card__label}>
          Short description
          <input
            type="text"
            placeholder="Short description"
            // value={value}
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
            className={classNames(s.card__input, { [s.error]: errors.body })}
            {...register('body', { required: { value: true, message: 'Text is required' } })}
          />
          {/* <input */}
          {/*   type="text" */}
          {/*   placeholder="Short description" */}
          {/*   // value={value} */}
          {/*   className={classNames(s.card__input, { [s.error]: errors.title })} */}
          {/*   {...register('description')} */}
          {/* /> */}
          <div className={s.card__error}>{errors?.body && <p>{errors?.body.message}</p>}</div>
        </label>
        {/* <ul className={s.card__label}> */}
        {/*   Tags */}
        {/*   {renderTagsInput(tags)} */}
        {/*   /!* <li className={s.itemTags}> *!/ */}
        {/*     <input placeholder="Tag" className={classNames(s.card__input, { [s.error]: errors.body })} /> *!/ */}
        {/*   /!*   <button className={s.deleteBtn} type="button"> *!/ */}
        {/*   /!*     Delete *!/ */}
        {/*   /!*   </button> *!/ */}
        {/*   /!* </li> *!/ */}
        {/* </ul> */}
        <ul className={s.card__label}>
          Tags
          {fields.map((item, index) => (
            <li key={item.id} className={s.itemTags}>
              <input
                placeholder="Tag"
                // className={s.card__input}
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
              // onClick={() => {
              //   append({ tag: '' })
              // }}
              // onChange={(e) => setNewTag(e.target.value)}
            />
            {/* <button className={s.deleteBtn} type="button"> */}
            {/*   Delete */}
            {/* </button> */}
            <button
              className={s.addBtn}
              type="button"
              onClick={async () => {
                await append({ tag: getValues('lastTag') })
                setValue('lastTag', '')
                setFocus('lastTag')
              }}
            >
              Add tag
            </button>
          </li>
        </ul>
        {/* <button */}
        {/*   type="button" */}
        {/*   className={s.addBtn} */}
        {/*   onClick={() => { */}
        {/*     append({ tag: '' }) */}
        {/*   }} */}
        {/* > */}
        {/*   Add tag */}
        {/* </button> */}
        <input className={s.card__submit} value="Send" type="submit" />
      </form>
    </div>
  )
}

export default ArticleForm
