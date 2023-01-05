import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserForm from '../components/UserForm'
import { useAuth } from '../hooks/useAuth'
import { usernameField, passwordField, imageField, emailField } from '../components/UserForm/templatesField'
import { useUpdateUserMutation } from '../redux'

function UserProfile() {
  const navigate = useNavigate()
  const [errors, setErrors] = useState()
  const [updateUser] = useUpdateUserMutation()
  const handleUpdateUser = async (data) => {
    try {
      await updateUser({
        user: {
          username: data.username,
          email: data.email,
          image: data.image,
        },
      }).unwrap()
      navigate('/')
    } catch (err) {
      setErrors(err.data.errors)
    }
  }
  const { username, email, image } = useAuth()
  const valuesProps = {
    username,
    email,
    image,
  }
  const template = {
    title: 'Edit Profile',
    fields: [
      usernameField,
      emailField,
      {
        ...passwordField,
        label: 'New password',
        placeholder: 'New password',
        validationProps: { ...passwordField.validationProps, required: { value: false } },
      },
      imageField,
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
