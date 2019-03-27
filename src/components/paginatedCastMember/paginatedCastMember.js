import React from 'react'
// import PropTypes from 'prop-types'
import { Row, Avatar, Icon } from 'antd'

export const PaginatedCastMember = React.memo(function PaginatedCastMember(props){
  const {
    imgRootUrl,
    size,
    content = [],
    onNext,
    onPrev,
    current
  } = props
  return(
    <Row id='custom-paginated-cast-member'>
      <div id='cast-member-container'>
        {content.map(
          (c,idx) => <CastMemberItem key={idx} name={c.name} img={c.profile_path} imgRootUrl={imgRootUrl}/>
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

const CastMemberItem = ({
  name,
  img,
  imgRootUrl
}) => {
  console.log({ imgRootUrl : `${imgRootUrl}${img}` })
  return(
    <div className='cast-member'>
      { img ?  <Avatar src={`${imgRootUrl}${img}`} size={100} /> : <Avatar icon='user' size={100} /> }
      <p className='name'>{name}</p>
    </div>
  )
}
