import React from 'react'
import PropTypes from 'prop-types'

export const MovieCastButton = ({
  id,
  onClick,
  className,
  iconJSX
}) => (
  <div
    id={id}
    onClick={onClick}
    className={className}>
    {iconJSX}
  </div>
)

MovieCastButton.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  iconJSX: PropTypes.element
}
