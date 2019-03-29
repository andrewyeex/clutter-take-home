import React, { Component } from 'react'
import {
  Row,
  Col
} from 'antd'

import { SearchPane } from '../../components/searchPane/searchPane'
import { ContentPane } from '../../components/contentPane/contentPane'
import { paginateArray } from '../../helpers/utils'
import {
  getCastMemberByID,
  getMoviesByTerm
} from '../../helpers/request'

import 'antd/dist/antd.css'
import './main.css'

export default class Main extends Component {
  state =  {
    term: '',
    movieResults: [],
    isLoadingSearchRequest: false,
    selectedMovie : {},
    selectedMovieTitle: '',
    isLoadingCastMemberRequest: false,
    paginatedCastMember : [],
    currentPagination: 0
  }

  handleSelectedMovie = async ({
    id,
    title,
    overview,
    poster_path : poster,
    release_date
  }) => {
    if (id === this.state.selectedMovie.id) return false
    this.setState({ isLoadingCastMemberRequest: true })
    const castMember = await getCastMemberByID(id)
    const paginatedCastMember = paginateArray(castMember, 6)
    this.setState({
      selectedMovie: {
        id,
        poster,
        overview,
        title: title + ` (${new Date(release_date).getFullYear()})`
      },
      paginatedCastMember,
      isLoadingCastMemberRequest: false
    })
  }

  handleSearch = async (term) => {
    this.setState({
      term,
      movieResults: [],
      isLoadingSearchRequest: true
    })
    const movieResults = await getMoviesByTerm(term)
    this.setState({
      isLoadingSearchRequest : false,
      ...{...(movieResults && {movieResults})}
    })
  }

  handleOnNextPagination = () => {
    this.setState(prevState => {
      if (prevState.currentPagination === prevState.paginatedCastMember.length-1) return
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
    const {
      movieResults,
      isLoadingSearchRequest,
      isLoadingCastMemberRequest,
      currentPagination,
      paginatedCastMember,
      selectedMovie
    } = this.state

    return (
      <Row>
        <Col xs={24} sm={24} md={14} lg={16} xl={18} id='main-left'>
        {
          !!Object.keys(selectedMovie).length &&
            <ContentPane
              selectedMovie={selectedMovie}
              currentPagination={currentPagination}
              paginatedCastMember={paginatedCastMember}
              isLoadingCastMemberRequest={isLoadingCastMemberRequest}
              handleOnNextPagination={this.handleOnNextPagination}
              handleOnPrevPagination={this.handleOnPrevPagination}/>
        }
        </Col>
          <Col xs={24} sm={24} md={10} lg={8} xl={6} id='main-right'>
            <SearchPane
              movieResults={movieResults}
              selectedMovieID={selectedMovie.id}
              handleSearch={this.handleSearch}
              handleSelectedMovie={this.handleSelectedMovie}
              isLoadingSearchRequest={isLoadingSearchRequest}
            />
          </Col>
      </Row>
    )
  }
}
