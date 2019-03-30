import React from 'react'
import {
  Spin,
  Input,
  Row,
  Col,
  Icon
} from 'antd'
import PropTypes from 'prop-types'

import { MovieItem } from '../movieItem/movieItem'

import './searchPane.css'

const { Search } = Input
const antIcon = <Icon type='loading' style={{ fontSize: 48, color: '#808080' }} spin />

export const SearchPane = React.memo(function SearchPane({
  movieResults,
  isLoadingSearchRequest,
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
})


SearchPane.propTypes = {
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
  isLoadingSearchRequest: PropTypes.bool,
  handleSelectedMovie: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired
}

SearchPane.defaultProps = {
  movieResults : [],
  selectedMovieID: -1,
  isLoadingSearchRequest: false,
  handleSelectedMovie: () => console.error('callback unavailable'),
  handleSearch: () => console.error('callback unavailable')
}
