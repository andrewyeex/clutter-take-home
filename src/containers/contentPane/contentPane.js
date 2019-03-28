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
  constructor(props){
    super(props)
    this.state = {
      currentPagination: 0
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.selectedMovie.id !== nextProps.selectedMovie.id) ||
            (this.state.currentPagination !== nextState.currentPagination) ||
            (this.props.isLoadingCastMemberRequest !== nextProps.isLoadingCastMemberRequest)
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

  render(){
    const { currentPagination } = this.state
    const {
      selectedMovie,
      paginatedCastMember,
      isLoadingCastMemberRequest
    } = this.props
    const {
      release_date : date,
      poster_path : img,
      title,
      overview,
    } = selectedMovie
    return(
      <Row style={{ height: '100%', padding: '1em' }}>
          <Row id='content-pane-container'>
          {
            isLoadingCastMemberRequest ?
            <div id='main-spin'>
              <Spin indicator={antIcon} />
            </div> :
            <React.Fragment>
              <Col xs={24} sm={24} md={8} lg={8} xl={8} style={{ textAlign: 'center', paddingTop: '0.5em' }}>
                <img src={img} alt='movie poster'/>
              </Col>
              <Col xs={24} sm={24} md={14} lg={14} xl={14} id='content-pane' className={!!paginatedCastMember[0].length ? `cast` : ''}>
                <Row>
                  <Title>{title + ` (${new Date(date).getFullYear()})`}</Title>
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
  selectedMovie: PropTypes.shape()
}
ContentPane.defaultProps = {}
