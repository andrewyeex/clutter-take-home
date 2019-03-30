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
import { getBaseImgURL } from '../../helpers/utils'
import { MovieInfo } from '../movieInfo/movieInfo'

import './movieContent.css'

const { Title } = Typography
const antIcon = <Icon type='loading' style={{ fontSize: 48, color: '#fff'}} spin />
const MovieTitle = ({title}) => (
  <Row>
    <Title>{title}</Title>
  </Row>
)
const MoviePoster = ({poster}) => (
  <Col {...{xs: 24, sm: 24, md: 24, lg: 8, xl: 8, id: 'main-img'}}>
    <img id='poster' src={poster} alt='movie poster'/>
  </Col>
)
const MovieLoading = () => (
  <div id='main-spin'>
    <Spin indicator={antIcon} />
  </div>
)

export const MovieContent = React.memo(function MovieContent({
  selectedMovie : {
    poster,
    overview,
    title
  },
  currentPagination,
  paginatedCastMember: castMembers,
  handleOnNextPagination: onNext,
  handleOnPrevPagination: onPrev,
  isLoadingCastMemberRequest
}){
  const rightRiv = {xs: 24, sm: 24, md: 24, lg: 14, xl: 14, id: 'content-pane', className: !!castMembers[0].length ? `cast` : ''}
  return(
    <Row id='content-pane-outer'>
        <Row id='content-pane-inner'>
        {isLoadingCastMemberRequest ?
          <MovieLoading /> :
          <React.Fragment>
            <MoviePoster poster={poster} />
            <Col {...rightRiv}>
              <MovieTitle title={title} />
              <MovieInfo header='Overview' content={overview} />
              {!!castMembers[0].length &&
                <MovieCast
                  imgBaseURL={getBaseImgURL(poster)}
                  castMembers={castMembers}
                  currentPagination={currentPagination}
                  onNext={onNext}
                  onPrev={onPrev} />}
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
  isLoadingCastMemberRequest: PropTypes.bool.isRequired,
  paginatedCastMember: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        profile_path: PropTypes.string.isRequired,
        tmdb_id: PropTypes.number.isRequired
      })
    ).isRequired
  ).isRequired,
  currentPagination: PropTypes.number.isRequired,
  handleOnNextPagination: PropTypes.func.isRequired,
  handleOnPrevPagination: PropTypes.func.isRequired
}

MovieContent.defaultProps = {
  selectedMovie: {
    overview: '',
    poster: '',
    title: ''
  },
  isLoadingCastMemberRequest: false,
  paginatedCastMember: [[]],
  currentPagination: 0,
  handleOnNextPagination: () => console.error('callback unavailable'),
  handleOnPrevPagination: () => console.error('callback unavailable')
}
