import React from 'react'
import {
  Input,
  Row,
  Col
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
    <Row id='movie-search-container'>
      <Col span={24}>
        <div className='padding-wrapper'>
          <Search
            id='movie-search-input'
            placeholder='Search for a movie'
            onSearch={handleSearch}
            style={{ width: '100%' }}
          />
        </div>
      </Col>
      <Col span={24} style={{ height: 'calc(100% - 60px)' }}>
        <div id='movie-search-list-container'>
          {
            isLoadingSearch ?
            <MovieLoading id='search-spin' /> :
            Array.isArray(movieResults) && movieResults.map(
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
