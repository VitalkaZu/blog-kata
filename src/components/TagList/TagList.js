import React from 'react'
import Tag from '../UI/Tag'

function TagList({ arrTags }) {
  return (
    <ul>
      {arrTags.length &&
        arrTags.map((tag, index) => {
          if (tag) {
            const tagTrim = tag.trim()
            if (tagTrim.length > 0 && tagTrim.length < 30) {
              return <Tag key={index} label={tagTrim} />
            }
          }
          return false
        })}
    </ul>
  )
}

export default TagList
