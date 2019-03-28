import React, { Component } from 'react'
import {
  Row,
  Col,
  Spin,
  Icon
} from 'antd'

import SearchPane from '../searchPane/searchPane'
import ContentPane from '../contentPane/contentPane'
import { getCastMemberByID } from '../../helpers/request'
import { paginateArray } from '../../helpers/utils'

import 'antd/dist/antd.css'
import './main.css'

const antIcon = <Icon type='loading' style={{ fontSize: 48, color: '#808080'}} spin />

export default class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedMovie : {},
      isLoadingCastMemberRequest: false,
      paginatedCastMember : []
    }
  }

  handleSelectedMovie = async (selectedMovie) => {
    this.setState({ isLoadingCastMemberRequest: true })
    const castMember = await getCastMemberByID(selectedMovie.id)
    const paginatedCastMember = paginateArray(castMember, 6)
    this.setState({
      selectedMovie,
      paginatedCastMember,
      isLoadingCastMemberRequest: false
    })
  }

  render() {
    const {
      isLoadingCastMemberRequest,
      paginatedCastMember,
      selectedMovie
    } = this.state
    return (
      <Row>
        <Col xs={24} sm={24} md={14} lg={16} xl={18} id='main-left'>
        {
          isLoadingCastMemberRequest ?
          <div id='main-spin'>
            <Spin indicator={antIcon} />
          </div> :
          Object.keys(selectedMovie).length ?
            <ContentPane
              paginatedCastMember={paginatedCastMember}
              selectedMovie={selectedMovie}/> : null
        }
        </Col>
          <Col xs={24} sm={24} md={10} lg={8} xl={6} id='main-right'>
            <SearchPane
              handleSelectedMovie={this.handleSelectedMovie}
              selectedMovieID={selectedMovie.id}
            />
          </Col>
      </Row>
    )
  }
}
