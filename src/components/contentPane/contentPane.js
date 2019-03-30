import React from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Typography,
  Icon,
  Spin,
  Divider
} from 'antd'

import { PaginatedCastMember } from '../paginatedCastMember/paginatedCastMember'
import { getBaseImgURL } from '../../helpers/utils'

import './contentPane.css'

const { Title, Text } = Typography
const antIcon = <Icon type='loading' style={{ fontSize: 48, color: '#808080'}} spin />

export const ContentPane = React.memo(function ContentPane({
  selectedMovie : {
    poster,
    overview,
    title
  },
  currentPagination,
  paginatedCastMember,
  handleOnNextPagination,
  handleOnPrevPagination,
  isLoadingCastMemberRequest
}){
  return(
    <Row id='content-pane-outer'>
        <Row id='content-pane-inner'>
        {
          isLoadingCastMemberRequest ?
          <div id='main-spin'>
            <Spin indicator={antIcon} />
          </div> :
          <React.Fragment>
            <Col xs={24} sm={24} md={24} lg={8} xl={8} id='main-img'>
              <img id='poster' src={poster} alt='movie poster'/>
            </Col>
            <Col xs={24} sm={24} md={24} lg={14} xl={14} id='content-pane' className={!!paginatedCastMember[0].length ? `cast` : ''}>
              <Row>
                <Title>{title}</Title>
              </Row>
              <Row>
                <Divider orientation='left'>
                  <Title level={2}>Overview</Title>
                </Divider>
                <Text>{overview}</Text>
              </Row>
              {
                !!paginatedCastMember[0].length &&
                <div id='content-pane-cast'>
                  <Divider orientation='left'>
                    <Title level={2}>Cast</Title>
                  </Divider>
                  {/* <Title level={3}>Cast</Title>
                  <Divider /> */}
                  <PaginatedCastMember
                    imgRootUrl={getBaseImgURL(poster)}
                    size={paginatedCastMember.length}
                    current={currentPagination}
                    castMembers={paginatedCastMember[currentPagination]}
                    onNext={handleOnNextPagination}
                    onPrev={handleOnPrevPagination}
                  />
                </div>
              }
            </Col>
          </React.Fragment>
        }
        </Row>
    </Row>
  )
})



ContentPane.propTypes = {
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

ContentPane.defaultProps = {
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
