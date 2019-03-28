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

PaginatedCastMember.propTypes = {}
PaginatedCastMember.defaultProps = {}
