import React from 'react'
import PropTypes from 'prop-types'
import {
  Avatar,
  Row,
  Col,
  Typography
} from 'antd'

import { formatDate } from '../../helpers/utils'

import './movieItem.css'

const { Text } = Typography

export const MovieItem = React.memo(function MovieItem(props){
  const {
    id,
    poster_path : img,
    title,
    release_date : date,
    handleOnClick,
    selectedMovieID
  } = props
  return(
    <Row
      id={id}
      className={`movie-item${id===selectedMovieID ? ' selected' : ''}`}
      onClick={()=>handleOnClick(props)}>
      <Col xs={8} sm={8} md={8} lg={8} xl={8}>
        <Avatar 
          className='movie-item-avatar'
          {...{
          shape: 'square',
          size: 'large',
          alt: 'movie poster',
          ...(!!img.length && {src: img})
        }} />
      </Col>
      <Col xs={16} sm={16} md={16} lg={16} xl={16}>
        <div>
          <h3>{title}</h3>
          <Text type='secondary'>{formatDate(date)}</Text>
        </div>
      </Col>
    </Row>
  )
})

MovieItem.prototype = {
  poster_path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func.isRequired
}

MovieItem.defaultProps = {
  poster_path: '',
  title: 'default',
  release_date: '2004-11-05T00:00:00.000Z',
  selectedMovieID: -1,
  handleOnClick: () => console.error('callback unavailable')
}
