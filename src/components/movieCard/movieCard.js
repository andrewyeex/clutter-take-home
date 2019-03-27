import React, { Component } from 'react'
import { Avatar, Row, Col, Typography } from 'antd'
import PropTypes from 'prop-types'
import './movieCard.css'

export const MovieCard = React.memo(function MovieCard(props){
  const {
    id,
    poster_path : img,
    title,
    release_date : date,
    handleOnClick,
    selectedMovie 
  } = props
  return(
    <Row className={`movie-card${id===selectedMovie.id ? ' selected' : ''}`} id={id} onClick={()=>handleOnClick(props)}>
      <Col xs={8} sm={8} md={8} lg={8} xl={8}>
      {!!img.length ? <Avatar size="large" shape="square" src={img} alt='movie poster'/> : <Avatar size="large" shape="square"/>}
      </Col>
      <Col xs={16} sm={16} md={16} lg={16} xl={16}>
        <div>
          <h3>{title}</h3>
          <Typography.Text type='secondary'>{dateFormat(date)}</Typography.Text>
        </div>
      </Col>
    </Row>
  )
})

/**
 * Pass a string to be turned into a Date Object.
 * "2004-11-05T00:00:00.000Z" => "10/4/04"
 * @param {string} str 
 * @returns {string}
 */
const dateFormat = str => {
  if (Number.isNaN(Date.parse(str))) return
  const date = new Date(str)
  return `${date.getMonth()}/${date.getDay()}/${String(date.getFullYear()).slice(2)}`
}

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
  selectedMovie: {},
  handleOnClick: () => console.log('TODO: handleOnClick')
}
