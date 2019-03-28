import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Typography
} from 'antd'

import { PaginatedCastMember } from '../../components/paginatedCastMember/paginatedCastMember'
import { getBaseImgURL } from '../../helpers/utils'

import './contentPane.css'

const { Title, Text } = Typography

export default class ContentPane extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentPagination: 0
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.selectedMovie.id !== nextProps.selectedMovie.id) ||
            (this.state.currentPagination !== nextState.currentPagination)
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
    } = this.props
    const {
      poster_path : img,
      title,
      overview,
    } = selectedMovie
    return(
      <Row style={{ height: '100%' }}>
        <Col xs={24} sm={24} md={10} lg={10} xl={10} style={{ textAlign: 'center', paddingTop: '0.5em' }}>
          <img src={img} alt='movie poster'/>
        </Col>
        <Col xs={24} sm={24} md={14} lg={14} xl={14} id='content-pane' className={!!paginatedCastMember[0].length ? `cast` : ''}>
          <Row>
            <Title>{title}</Title>
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
                content={paginatedCastMember[currentPagination]}
                onNext={this.handleOnNextPagination}
                onPrev={this.handleOnPrevPagination}
              />
            </div>
          }
        </Col>
      </Row>
    )
  }
}



ContentPane.propTypes = {
  selectedMovie: PropTypes.shape()
}
ContentPane.defaultProps = {}
