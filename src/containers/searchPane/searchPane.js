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
import { MovieCard } from '../../components/movieCard/movieCard'

import './searchPane.css'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />

export default class SearchPane extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoadingSearchRequest: false,
      results: [],
      term: ''
    }
  }

  handleSearch = async (e) => {
    if (e.key === 'Enter') {
      const term = e.target.value
      this.setState({ isLoadingSearchRequest: true, term})
      const r = await getMoviesByTerm(term)
      this.setState({ isLoadingSearchRequest: false, results: r })
    }
  }

  render(){
    const {
      isLoadingSearchRequest,
      results
    } = this.state
    const { handleSelectedMovie } = this.props
    return(
      <Row style={{ height: '100vh' }}>
        <Col span={24}>
          <div className='padding-wrapper'>
            <Input.Search
              placeholder='Enter movie term'
              onKeyPress={this.handleSearch}
              onSearch={value => console.log(value)}
              style={{ width: '100%' }}
            />
          </div>
        </Col>
        <Col span={24} style={{ height: 'calc(100% - 60px)' }}>
          <div id='search-list-container' className='padding-wrapper'>
            {
              isLoadingSearchRequest ?
              <Spin indicator={antIcon} /> :
              results.map(props => <MovieCard key={props.id} handleOnClick={()=>handleSelectedMovie(props)} {...props} />)
            }
          </div>
        </Col>
      </Row>
    )
  }
}

SearchPane.propTypes = {
  handleSelectedMovie: PropTypes.func.isRequired
}
SearchPane.defaultProps = {}
