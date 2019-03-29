import React from 'react'
import PropTypes from 'prop-types'

import { Avatar } from 'antd'

export const CastMemberItem = React.memo(function CastMemberItem({
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

CastMemberItem.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired
}
CastMemberItem.defaultProps = {
  name: '',
  img: ''
}
