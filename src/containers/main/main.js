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
  constructor(props){
    super(props)
    this.state =  {
      selectedMovie : {},
      isLoadingCastMemberRequest: false,
      paginatedCastMember : []
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.isLoadingCastMemberRequest !== nextState.isLoadingCastMemberRequest)
  }

  handleSelectedMovie = async (selectedMovie) => {
    console.log('e2124')
    if (selectedMovie.id === this.state.selectedMovie.id) return false
    // isLoadingCastMemberRequest used to handle ui/ux for async interactions on the page
    this.setState({ isLoadingCastMemberRequest: true })
    const castMember = await getCastMemberByID(selectedMovie.id)
    console.log({ castMember })
    if (castMember) {
      const paginatedCastMember = paginateArray(castMember, 6)
      this.setState({
        selectedMovie,
        paginatedCastMember,
        isLoadingCastMemberRequest: false
      })
      return true
    }
    this.setState({ isLoadingCastMemberRequest: false })
    return false
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
