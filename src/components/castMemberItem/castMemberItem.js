import React from 'react'
import PropTypes from 'prop-types'

import { Avatar } from 'antd'

export const CastMemberItem = React.memo(function CastMemberItem({
  name,
  img
}){
  const avatarProps = {
    size: 100,
    ...(
      img ?
      {src: img} :
      {icon: 'user'}
    )
  }
  return(
    <div className='cast-member'>
      <Avatar {...avatarProps} />
      <p className='name'>{name}</p>
    </div>
  )
})

CastMemberItem.propTypes = {}
CastMemberItem.defaultProps = {}
