import React, { Component } from 'react'
import {
  Row,
  Col
} from 'antd'

import SearchPane from '../searchPane/searchPane'
import ContentPane from '../contentPane/contentPane'
import { getCastMemberByID } from '../../helpers/request'
import { paginateArray } from '../../helpers/utils'

import 'antd/dist/antd.css'
import './main.css'

export default class Main extends Component {
  state = {
    selectedMovie : {},
    isLoadingCastMemberRequest: false,
    paginatedCastMember : []
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.selectedMovie.id !== nextState.selectedMovie.id)
  }

  handleSelectedMovie = async (selectedMovie) => {
    // isLoadingCastMemberRequest used to handle ui/ux
    // for async interactions on the page
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
          !!Object.keys(selectedMovie).length &&
            <ContentPane
              isLoadingCastMemberRequest={isLoadingCastMemberRequest}
              paginatedCastMember={paginatedCastMember}
              selectedMovie={selectedMovie}/>
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
