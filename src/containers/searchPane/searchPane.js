import React, { Component } from 'react'
import {
  Spin,
  Input,
  Row,
  Col,
  Icon
} from 'antd'
import PropTypes from 'prop-types'

import { getMoviesByTerm } from '../../helpers/request'
import { MovieItem } from '../../components/movieItem/movieItem'

import './searchPane.css'

const { Search } = Input
const antIcon = <Icon type='loading' style={{ fontSize: 48, color: '#808080' }} spin />

export default class SearchPane extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoadingSearchRequest: false,
      movieResults: [],
      term: ''
    }
  }

  handleSearch = async (term) => {
    // isLoadingSearchRequest is used to handle ui/ux for async interactions on the page
    this.setState({ term, isLoadingSearchRequest: true })
    const movieResults = await getMoviesByTerm(term)
    this.setState({ movieResults, isLoadingSearchRequest: false })
  }

  render() {
    const {
      isLoadingSearchRequest,
      movieResults
    } = this.state
    const {
      handleSelectedMovie,
      selectedMovieID
    } = this.props
    return(
      <Row id='search-pane-container'>
        <Col span={24}>
          <div className='padding-wrapper'>
            <Search
              id='search-pane-input'
              placeholder='Enter movie term'
              onSearch={this.handleSearch}
              style={{ width: '100%' }}
            />
          </div>
        </Col>
        <Col span={24} style={{ height: 'calc(100% - 60px)' }}>
          <div id='search-list-container' className='padding-wrapper'>
            {
              isLoadingSearchRequest ?
              <div id='search-spin'>
                <Spin indicator={antIcon} />
              </div> :
              movieResults.map(
                movie =>
                  <MovieItem
                    key={movie.id}
                    handleOnClick={handleSelectedMovie}
                    selectedMovieID={selectedMovieID}
                    {...movie} />
              )
            }
          </div>
        </Col>
      </Row>
    )
  }
}

SearchPane.propTypes = {
  handleSelectedMovie: PropTypes.func.isRequired,
  selectedMovieID: PropTypes.number
}
SearchPane.defaultProps = {
  handleSelectedMovie: () => console.error('callback unavailable'),
  selectedMovieID: -1
}
