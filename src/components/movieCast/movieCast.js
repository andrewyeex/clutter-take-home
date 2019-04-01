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

import './movieCast.css'

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
    <div id='movie-cast-container'> {/* id='content-pane-cast' */}
      <Divider orientation='left'>
        <Title level={2}>Cast</Title>
      </Divider>
      <Row id='movie-cast-member-container'> {/* id='custom-paginated-cast-member' */}
        <div id='cast-member-container'>
          {Array.isArray(castMembers) && castMembers.map(
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
            className={currentPagination === 0 ? ' inactive' : ''}
            onClick={handleOnPrevPagination}
            iconJSX={<Icon type="left" />}
          />
          <MovieCastButton
            id='next-btn'
            className={currentPagination === castSize-1 ? ' inactive' : ''}
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
      name: PropTypes.string,
      profile_path: PropTypes.string,
      tmdb_id: PropTypes.number
    })
  ).isRequired,
  currentPagination: PropTypes.number.isRequired,
  handleOnNextPagination: PropTypes.func.isRequired,
  handleOnPrevPagination: PropTypes.func.isRequired
}

MovieCast.defaultProps = {
  castMembers: []
}
