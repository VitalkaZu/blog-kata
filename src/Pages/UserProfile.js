import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UserForm from '../components/UserForm'
import { usernameField, passwordField, imageField, emailField } from '../components/UserForm/templatesField'
import { useUpdateUserMutation } from '../redux'
import { setUser } from '../redux/slices/userSlice'

function UserProfile() {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState()
  const [updateUser] = useUpdateUserMutation()
  const handleUpdateUser = async (data) => {
    console.log(data)
    updateUser({
      user: {
        username: data.username,
        email: data.email,
        image: data.image,
      },
    })
      .unwrap()
      .then((res) => dispatch(setUser(res.data)))
      .catch((e) => {
        setErrors(e.data.errors)
        console.log(e)
      })
  }
  const { username, email, image } = useSelector((state) => state.userSlice.user)
  const valuesProps = {
    username,
    email,
    image,
  }
  const template = {
    title: 'Edit Profile',
    fields: [
      { ...usernameField, value: username },
      { ...emailField, value: email },
      {
        ...passwordField,
        label: 'New password',
        placeholder: 'New password',
        validationProps: { ...passwordField.validationProps, required: { value: false } },
      },
      { ...imageField, value: image },
    ],
    submitLabel: 'Save',
  }
  return (
    <UserForm
      template={template}
      onSubmit={(data) => handleUpdateUser(data)}
      errorsProps={errors}
      valuesProps={valuesProps}
    />
  )
}

export default UserProfile
