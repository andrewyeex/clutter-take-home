import React from 'react'
import PropTypes from 'prop-types'

import { Avatar } from 'antd'

export const MovieCastItem = React.memo(function MovieCastItem({
  name,
  img
}){
  return(
    <div className='cast-member'>
      <Avatar
        {...{
          size: 100,
          ...(img ? {src: img} : {icon: 'user'})
        }}
      />
      <p className='name'>{name}</p>
    </div>
  )
})

MovieCastItem.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired
}
MovieCastItem.defaultProps = {
  name: '',
  img: ''
}
