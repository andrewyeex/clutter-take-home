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
  const onClick = () => id===selectedMovieID ? '' : handleOnClick(props)
  const avatarProps = {
    shape: 'square',
    size: 'large',
    alt: 'movie poster',
    ...(!!img.length && {src: img})
  }
  return(
    <Row
      id={id}
      className={`movie-item${id===selectedMovieID ? ' selected' : ''}`}
      onClick={onClick}>
      <Col xs={8} sm={8} md={8} lg={8} xl={8}>
        <Avatar {...avatarProps} />
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
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func.isRequired
}

MovieItem.defaultProps = {
  img: '',
  title: 'default',
  date: '00/00/0000',
  selectedMovieID: -1,
  handleOnClick: () => console.error('Fn() unavailable')
}
