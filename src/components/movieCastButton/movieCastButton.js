import React from 'react'
import PropTypes from 'prop-types'

import './movieCastButton.css'

export const MovieCastButton = React.memo(function MovieCastButton({
  id,
  onClick,
  className,
  iconJSX
}){
  return(
  <div
    id={id}
    onClick={onClick}
    className={`small-circular-btn${className}`}>
    {iconJSX}
  </div>
)})

MovieCastButton.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  iconJSX: PropTypes.element
}
