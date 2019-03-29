import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Typography,
  Icon,
  Spin
} from 'antd'

import { PaginatedCastMember } from '../../components/paginatedCastMember/paginatedCastMember'
import { getBaseImgURL } from '../../helpers/utils'

import './contentPane.css'

const { Title, Text } = Typography
const antIcon = <Icon type='loading' style={{ fontSize: 48, color: '#808080'}} spin />

export default class ContentPane extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPagination: 0
    }
  }

  handleOnNextPagination = () => {
    this.setState(prevState => {
      if (prevState.currentPagination === this.props.paginatedCastMember.length-1) return
      return { currentPagination: prevState.currentPagination + 1 }
    })
  }

  handleOnPrevPagination = () => {
    this.setState(prevState => {
      if (prevState.currentPagination === 0) return
      return { currentPagination: prevState.currentPagination - 1 }
    })
  }

  render() {
    const { currentPagination } = this.state
    const {
      selectedMovie,
      selectedMovieTitle,
      paginatedCastMember,
      isLoadingCastMemberRequest
    } = this.props
    const {
      poster_path : img,
      overview
    } = selectedMovie
    return(
      <Row id='content-pane-outer'>
          <Row id='content-pane-inner'>
          {
            isLoadingCastMemberRequest ?
            <div id='main-spin'>
              <Spin indicator={antIcon} />
            </div> :
            <React.Fragment>
              <Col xs={24} sm={24} md={8} lg={8} xl={8} id='main-img'>
                <img src={img} alt='movie poster'/>
              </Col>
              <Col xs={24} sm={24} md={14} lg={14} xl={14} id='content-pane' className={!!paginatedCastMember[0].length ? `cast` : ''}>
                <Row>
                  <Title>{selectedMovieTitle}</Title>
                </Row>
                <Row>
                  <Title level={2}>Overview</Title>
                  <Text>{overview}</Text>
                </Row>
                {
                  !!paginatedCastMember[0].length &&
                  <div>
                    <Title level={2}>Cast</Title>
                    <PaginatedCastMember
                      imgRootUrl={getBaseImgURL(img)}
                      size={paginatedCastMember.length}
                      current={currentPagination}
                      castMembers={paginatedCastMember[currentPagination]}
                      onNext={this.handleOnNextPagination}
                      onPrev={this.handleOnPrevPagination}
                    />
                  </div>
                }
              </Col>
            </React.Fragment>
          }
          </Row>
      </Row>
    )
  }
}



ContentPane.propTypes = {
  selectedMovie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    img: PropTypes.string,
    overview: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
    handleOnClick: PropTypes.func.isRequired,
    release_date: PropTypes.string.isRequired,
    selectedMovieID: PropTypes.number,
    title: PropTypes.string.isRequired,
    tmdb_id: PropTypes.number.isRequired
  }).isRequired,
  isLoadingCastMemberRequest: PropTypes.bool.isRequired,
  paginatedCastMember: PropTypes.array.isRequired
}
ContentPane.defaultProps = {
  selectedMovie: {
    id: 0,
    date: '',
    overview: '',
    poster_path: '',
    handleOnClick: () => console.error('callback unavailable'),
    release_date: '',
    title: '',
    tmdb_id: 0
  },
  isLoadingCastMemberRequest: false,
  paginatedCastMember: [[]]
}
