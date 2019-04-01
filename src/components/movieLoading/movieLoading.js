import React from 'react'
import PropTypes from 'prop-types'
import {
  Icon,
  Spin
} from 'antd'

const antIcon = <Icon type='loading' style={{ fontSize: 48, color: '#fff'}} spin />

export const MovieLoading = React.memo(function MovieLoading({ id }){
  return(
    <div id={id}>
      <Spin indicator={antIcon} />
    </div>
  )
})

MovieLoading.propTypes = {
  id: PropTypes.string,
}
