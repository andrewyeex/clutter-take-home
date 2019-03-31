import React from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Typography,
  Icon,
  Spin
} from 'antd'

import { MovieCast } from '../movieCast/movieCast'
import { MovieLoading } from '../movieLoading/movieLoading'
import { getBaseImgURL } from '../../helpers/utils'
import { MovieInfo } from '../movieInfo/movieInfo'

import './movieContent.css'

const { Title } = Typography


export const MovieContent = React.memo(function MovieContent({
  selectedMovie : {
    poster,
    overview,
    title
  },
  castMembers,
  currentPagination,
  isLoadingCastMember,
  handleOnNextPagination,
  handleOnPrevPagination,
}){
  return(
    <Row id='content-pane-outer'>
        <Row id='content-pane-inner'>
        {isLoadingCastMember ?
          <MovieLoading id='main-spin'/> :
          <React.Fragment>
            <Col xs={24} sm={24} md={24} lg={8} xl={8} id='main-img'>
              <img id='poster' src={poster} alt='movie poster'/>
            </Col>
            <Col xs={24} sm={24} md={24} lg={14} xl={14} id='content-pane' className={!!castMembers[0].length ? `cast` : ''}>
              <Row>
                <Title>{title}</Title>
              </Row>
              <MovieInfo header='Overview' content={overview} />
              {!!castMembers[0].length &&
                <MovieCast
                  castSize={castMembers.length}
                  castMembers={castMembers[currentPagination]}
                  imgBaseURL={getBaseImgURL(poster)}
                  currentPagination={currentPagination}
                  handleOnNextPagination={handleOnNextPagination}
                  handleOnPrevPagination={handleOnPrevPagination} />}
            </Col>
          </React.Fragment>}
        </Row>
    </Row>
  )
})

MovieContent.propTypes = {
  selectedMovie: PropTypes.shape({
    overview: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  isLoadingCastMember: PropTypes.bool.isRequired,
  castMembers: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        profile_path: PropTypes.string,
        tmdb_id: PropTypes.number.isRequired
      })
    ).isRequired
  ).isRequired,
  currentPagination: PropTypes.number.isRequired,
  handleOnNextPagination: PropTypes.func.isRequired,
  handleOnPrevPagination: PropTypes.func.isRequired
}
