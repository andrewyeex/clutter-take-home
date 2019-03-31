import React from 'react'
import {
  Input,
  Row,
  Col,
} from 'antd'
import PropTypes from 'prop-types'

import { MovieItem } from '../movieItem/movieItem'
import { MovieLoading } from '../movieLoading/movieLoading'

import './movieSearch.css'

const { Search } = Input

export const MovieSearch = React.memo(function MovieSearch({
  movieResults,
  isLoadingSearch,
  selectedMovieID,
  handleSearch,
  handleSelectedMovie
}){
  return(
    <Row id='search-pane-container'>
      <Col span={24}>
        <div className='padding-wrapper'>
          <Search
            id='search-pane-input'
            placeholder='Enter movie term'
            onSearch={handleSearch}
            style={{ width: '100%' }}
          />
        </div>
      </Col>
      <Col span={24} style={{ height: 'calc(100% - 60px)' }}>
        <div id='search-list-container'>
          {
            isLoadingSearch ?
            <MovieLoading id='search-spin' /> :
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
})


MovieSearch.propTypes = {
  movieResults: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tmdb_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      poster_path: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired
    })
  ).isRequired,
  selectedMovieID: PropTypes.number,
  isLoadingSearch: PropTypes.bool,
  handleSelectedMovie: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired
}

MovieSearch.defaultProps = {
  movieResults : [],
  selectedMovieID: -1,
  isLoadingSearch: false,
  handleSelectedMovie: () => console.error('callback unavailable'),
  handleSearch: () => console.error('callback unavailable')
}
