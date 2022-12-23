import React from 'react'
import UserForm from '../components/UserForm'

function UserProfile() {
  const template = {
    title: 'Edit Pro',
    fields: [
      {
        label: 'Username',
        type: 'text',
        name: 'username',
        placeholder: 'Username',
      },
      {
        label: 'Email address',
        type: 'text',
        name: 'email',
        placeholder: 'Email address',
      },
      {
        label: 'New password',
        type: 'password',
        name: 'password',
        placeholder: 'New password',
      },
      {
        label: 'Avatar image (url)',
        type: 'text',
        name: 'image',
        placeholder: 'Avatar image (url)',
      },
    ],
    footer: 'footerText',
  }
  return <UserForm template={template} />
}

export default UserProfile
