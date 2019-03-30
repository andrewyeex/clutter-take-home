import React from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Divider,
  Typography
} from 'antd'

const { Text, Title } = Typography

export const MovieInfo = React.memo(function MovieContent({
  header,
  content
}){
  return(
    <Row>
      <Divider orientation='left'>
        <Title level={2}>{header}</Title>
      </Divider>
      <Text>{content}</Text>
    </Row>
  )
})

MovieInfo.PropTypes = {
  header: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}
