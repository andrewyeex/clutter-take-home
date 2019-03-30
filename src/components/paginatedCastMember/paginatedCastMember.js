import React from 'react'
import PropTypes from 'prop-types'

import { MovieCastItem } from '../movieCastItem/movieCastItem'

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
            <MovieCastItem
              key={tmdb_id}
              name={name}
              img={img ? `${imgRootUrl}${img}` : ''}/>
        )}
      </div>
      <div>
        <div
          id='prev-btn'
          onClick={onPrev} // will this work if inactive ?
          className={`small-circular-btn${current === 0 ? ' inactive' : ''}`}>
          <Icon type="left" />
        </div>
        <div
          id='next-btn'
          onClick={onNext}
          className={`small-circular-btn${current === size-1 ? ' inactive' : ''}`}>
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
