import React, { Component } from 'react'
import { Avatar, Row, Col } from 'antd'
import PropTypes from 'prop-types'
import './movieCard.css'

export const MovieCard = React.memo(function MovieCard({
  id,
  poster_path : img,
  title,
  release_date : date,
  handleOnClick
}){
  return(
    <Row className='movie-card' id={id} onClick={handleOnClick}>
      <Col xs={8} sm={8} md={8} lg={8} xl={8}>
      {!!img.length ? <Avatar size="large" shape="square" src={img} alt='movie poster'/> : <Avatar size="large" shape="square"/>}
      </Col>
      <Col xs={16} sm={16} md={16} lg={16} xl={16}>
        <strong>{title}</strong>
        <p>{date}</p>
      </Col>
    </Row>
  )
})

MovieCard.prototype = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func.isRequired
}
MovieCard.defaultProps = {
  img: '',
  title: 'default',
  date: '00/00/0000',
  handleOnClick: () => console.log('TODO: handleOnClick')
}
