import React from 'react'
import PropTypes from 'prop-types'

import { CastMemberItem } from '../castMemberItem/castMemberItem'

import {
  Row,
  Icon
} from 'antd'

export const PaginatedCastMember = React.memo(function PaginatedCastMember({
  imgRootUrl,
  size,
  castMembers,
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
              img={img ? `${imgRootUrl}${img}` : ''}/>
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

PaginatedCastMember.propTypes = {
  imgRootUrl: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  castMembers: PropTypes.array.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired
}
PaginatedCastMember.defaultProps = {
  imgRootUrl: '',
  size: 0,
  current: 0,
  castMembers: [],
  onNext: () => console.error('callback unavailable'),
  onPrev: () => console.error('callback unavailable')
}
