import React from 'react'
import { useSelector } from 'react-redux'
import UserForm from '../components/UserForm'
import { usernameField, passwordField, imageField, emailField } from '../components/UserForm/templatesField'

function UserProfile() {
  const { username, email, image } = useSelector((state) => state.userReducer.user)
  const template = {
    title: 'Edit Profile',
    fields: [
      { ...usernameField, value: username },
      { ...emailField, value: email },
      { ...passwordField, label: 'New password', placeholder: 'New password' },
      { ...imageField, value: image },
    ],
    submitLabel: 'Save',
  }
  return <UserForm template={template} />
}

export default UserProfile
