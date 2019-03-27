import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ContentPane extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render(){
    console.log({selectedMovie: this.props.selectedMovie})
    return(
      <div>Hello World</div>
    )
  }
}

ContentPane.propTypes = {
  selectedMovie: PropTypes.shape()
}
ContentPane.defaultProps = {}
