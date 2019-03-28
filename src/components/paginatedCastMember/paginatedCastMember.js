import React from 'react'
import PropTypes from 'prop-types'
import { Row, Avatar, Icon } from 'antd'

export const PaginatedCastMember = React.memo(function PaginatedCastMember({
  imgRootUrl,
  size,
  castMembers = [],
  onNext,
  onPrev,
  current
}){
  return(
    <Row id='custom-paginated-cast-member'>
      <div id='cast-member-container'>
        {castMembers.map(
          ({
            name,
            profile_path : img,
            tmdb_id
          }) => 
            <CastMemberItem
              key={tmdb_id}
              name={name}
              img={img ? `${imgRootUrl}${img}` : false}/>
        )}
      </div>
      <div>
        <div className={`small-circular-btn${current === 0 ? ' inactive' : ''}`} onClick={onPrev}>
          <Icon type="left" />
        </div>
        <div className={`small-circular-btn${current === size-1 ? ' inactive' : ''}`}  onClick={onNext}>
        <Icon type="right" />
        </div>
      </div>
    </Row>
  )
})

const CastMemberItem = React.memo(function CastMemberItem({
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
