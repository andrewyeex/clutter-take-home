import React from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Icon,
  Divider,
  Typography
} from 'antd'

import { MovieCastItem } from '../movieCastItem/movieCastItem'

const { Title } = Typography

export const MovieCast = React.memo(function MovieCast({
  imgBaseURL,
  castMembers,
  currentPagination: current,
  onNext,
  onPrev
}){
  return(
    <div id='content-pane-cast'>
      <Divider orientation='left'>
        <Title level={2}>Cast</Title>
      </Divider>
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
                img={img ? `${imgBaseURL}${img}` : ''}/>
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
            className={`small-circular-btn${current === castMembers.length-1 ? ' inactive' : ''}`}>
            <Icon type="right" />
          </div>
        </div>
      </Row>
    </div>
  )
})