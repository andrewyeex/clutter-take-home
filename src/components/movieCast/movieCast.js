import React from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Icon,
  Divider,
  Typography
} from 'antd'

import { MovieCastItem } from '../movieCastItem/movieCastItem'
import { MovieCastButton } from '../movieCastButton/movieCastButton'

const { Title } = Typography

export const MovieCast = React.memo(function MovieCast({
  imgBaseURL,
  castSize,
  castMembers,
  currentPagination,
  handleOnNextPagination,
  handleOnPrevPagination
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
                img={!!img ? `${imgBaseURL}${img}` : ''}/>
          )}
        </div>
        <div>
          <MovieCastButton
            id='prev-btn'
            className={`small-circular-btn${currentPagination === 0 ? ' inactive' : ''}`}
            onClick={handleOnPrevPagination}
            iconJSX={<Icon type="left" />}
          />
          <MovieCastButton
            id='next-btn'
            className={`small-circular-btn${currentPagination === castSize-1 ? ' inactive' : ''}`}
            onClick={handleOnNextPagination}
            iconJSX={<Icon type="right" />}
          />
        </div>
      </Row>
    </div>
  )
})

MovieCast.propTypes = {
  imgBaseURL: PropTypes.string.isRequired,
  castMembers: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        profile_path: PropTypes.string,
        tmdb_id: PropTypes.number.isRequired
      })
  ).isRequired,
  currentPagination: PropTypes.number.isRequired,
  handleOnNextPagination: PropTypes.func.isRequired,
  handleOnPrevPagination: PropTypes.func.isRequired
}

MovieCast.defaultProps = {
  castMembers: [[]]
}
