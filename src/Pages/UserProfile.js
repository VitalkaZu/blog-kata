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
        validationProps: {
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Username length should be at least 3 characters',
          },
          maxLength: {
            value: 20,
            message: 'Username cannot exceed more than 20 characters',
          },
        },
      },
      {
        label: 'Email address',
        type: 'email',
        name: 'email',
        placeholder: 'Email address',
        validationProps: {
          required: 'Email is required',
          pattern: {
            value:
            // eslint-disable-next-line max-len
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Please enter valid email!',
          },
        },
      },
      {
        label: 'New password',
        type: 'password',
        name: 'password',
        placeholder: 'New password',
        validationProps: {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password length should be at least 6 characters',
          },
          maxLength: {
            value: 40,
            message: 'Password cannot exceed more than 40 characters',
          },
        },
      },
      {
        label: 'Avatar image (url)',
        type: 'url',
        name: 'image',
        placeholder: 'Avatar image (url)',
        validationProps: {
          pattern: {
            value:
            // eslint-disable-next-line max-len
              /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
            message: 'Please enter valid url',
          },
        },
      },
    ],
    footer: 'footerText',
  }
  return <UserForm template={template} />
}

export default UserProfile
