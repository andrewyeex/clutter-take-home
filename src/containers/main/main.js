import React, { Component } from 'react'
import {
  Row,
  Col
} from 'antd'

import { MovieSearch } from '../../components/movieSearch/movieSearch'
import { MovieContent } from '../../components/movieContent/movieContent'
import {
  sanitize,
  paginateArray
} from '../../helpers/utils'
import {
  getCastMemberByID,
  getMoviesByTerm
} from '../../helpers/request'

import 'antd/dist/antd.css'
import './main.css'

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state =  {
      castMembers: [],
      movieResults: [],
      selectedMovie: {},
      currentPagination: 0,
      isLoadingCastMember: false,
      isLoadingSearch: false,
    }
  }

  handleSelectedMovie = async ({
    id,
    title,
    overview,
    poster_path : poster,
    release_date
  }) => {
    if (id === this.state.selectedMovie.id) return false
    this.setState({ currentPagination: 0, isLoadingCastMember: true })
    const castMembers = await getCastMemberByID(id)
    this.setState({
      ...{...(
        Array.isArray(castMembers) &&
        {
          castMembers: paginateArray(castMembers, 6),
          selectedMovie: {
            id,
            poster,
            overview,
            title: title + ` (${new Date(release_date).getFullYear()})`
          }
        }
      )},
      isLoadingCastMember: false
    })
  }

  handleSearch = async (term) => {
    term = sanitize(term)
    if (!term) return false
    this.setState({
      movieResults: [],
      selectedMovie: {},
      isLoadingSearch: true
    })
    const movieResults = await getMoviesByTerm(term)
    this.setState({
      isLoadingSearch : false,
      ...{...(movieResults && { movieResults })}
    })
  }

  handleOnNextPagination = () => {
    this.setState(prevState => {
      if (prevState.currentPagination === prevState.castMembers.length-1) return
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
      castMembers,
      movieResults,
      selectedMovie,
      currentPagination,
      isLoadingSearch,
      isLoadingCastMember
    } = this.state

    return (
      <Row>
        <Col xs={24} sm={24} md={14} lg={16} xl={18} id='main-left'>
        {
          !!selectedMovie.id &&
            <MovieContent
              castMembers={castMembers}
              selectedMovie={selectedMovie}
              currentPagination={currentPagination}
              isLoadingCastMember={isLoadingCastMember}
              handleOnNextPagination={this.handleOnNextPagination}
              handleOnPrevPagination={this.handleOnPrevPagination}/>
        }
        </Col>
          <Col xs={24} sm={24} md={10} lg={8} xl={6} id='main-right'>
            <MovieSearch
              movieResults={movieResults}
              selectedMovieID={selectedMovie.id}
              handleSearch={this.handleSearch}
              handleSelectedMovie={this.handleSelectedMovie}
              isLoadingSearch={isLoadingSearch}
            />
          </Col>
      </Row>
    )
  }
}
