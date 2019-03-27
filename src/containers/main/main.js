import React, { Component } from 'react'
import { Row, Col, Spin, Icon} from 'antd'

import SearchPane from '../searchPane/searchPane'
import ContentPane from '../contentPane/contentPane'
import { getCastMemberByID } from '../../helpers/request'

import 'antd/dist/antd.css'
import './main.css'

export const antIcon = <Icon type="loading" style={{ fontSize: 48, color: '#808080'}} spin />

export default class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedMovie : {},
      isLoadingCastMemberRequest: false,
      castMember : [],
      paginatedCastMember : []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedMovie = {} } = this.state
    if (selectedMovie.id !== prevState.selectedMovie.id) this.handleGetCastMemberById(selectedMovie.id)
  }

  handleSelectedMovie = async (selectedMovie) => {
    this.setState({ isLoadingCastMemberRequest: true })
    const castMember = await this.handleGetCastMemberById(selectedMovie.id)
    const paginatedCastMember = paginateArray(castMember, 6)
    this.setState({ selectedMovie, castMember, paginatedCastMember, isLoadingCastMemberRequest: false })
  }

  handleGetCastMemberById = async (ID) => {
    const castMember = await getCastMemberByID(ID)
    return castMember
  }

  render() {
    return (
      <Row>
        <Col xs={24} sm={24} md={14} lg={16} xl={18} id='main-left'>
        {
          this.state.isLoadingCastMemberRequest ?
          <div id='main-spin'>
            <Spin indicator={antIcon} />
          </div> :
          Object.keys(this.state.selectedMovie).length ?
            <ContentPane
              isLoadingCastMemberRequest={this.state.isLoadingCastMemberRequest}
              castMember={this.state.castMember}
              paginatedCastMember={this.state.paginatedCastMember}
              selectedMovie={this.state.selectedMovie}/> : null
        }
        </Col>
          <Col xs={24} sm={24} md={10} lg={8} xl={6} id='main-right'>
            <SearchPane
              handleSelectedMovie={this.handleSelectedMovie}
              selectedMovie={this.state.selectedMovie}
            />
          </Col>
      </Row>
    )
  }
}

const paginateArray = (arr, limit) => {
  return arr.reduce((sub, item) => {
    if (sub[sub.length - 1].length >= limit) sub.push([item])
    else sub[sub.length - 1].push(item)
    return sub
  }, [[]])
}
