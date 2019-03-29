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
})


SearchPane.propTypes = {
  handleSelectedMovie: PropTypes.func.isRequired,
  movieResults: PropTypes.array.isRequired,
  selectedMovieID: PropTypes.number
}
SearchPane.defaultProps = {
  movieResults : [],
  handleSelectedMovie: () => console.error('callback unavailable'),
  selectedMovieID: -1
}
