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
    poster_path,
    title,
    release_date,
    handleOnClick,
    selectedMovieID
  } = props
  const src = typeof poster_path === 'string' && !!poster_path.length && { src: poster_path }
  return(
    <Row
      id={id}
      className={`movie-item${id===selectedMovieID ? ' selected' : ''}`}
      onClick={()=>handleOnClick(props)}>
      <Col xs={8} sm={8} md={8} lg={8} xl={8}>
        <Avatar 
          alt='movie poster'
          size='large'
          shape='square'
          className='movie-item-avatar'
          {...{...src}} />
      </Col>
      <Col xs={16} sm={16} md={16} lg={16} xl={16}>
        <div>
          <h3>{title}</h3>
          <Text type='secondary'>{formatDate(release_date)}</Text>
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
