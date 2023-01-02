import React from 'react'
import Tag from '../UI/Tag'

function TagList({ arrTags }) {
  return (
    <ul>
      {arrTags &&
        arrTags.map((tag, index) => {
          const tagTrim = tag.trim()
          if (tagTrim.length > 0 && tagTrim.length < 30) {
            return <Tag key={index} label={tagTrim} />
          }
          return false
        })}
    </ul>
  )
}

export default TagList
