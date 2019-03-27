import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getMoviesByID, getCastMemberByID } from '../../helpers/request'
import { Row, Col } from 'antd';

export default class ContentPane extends Component {
  componentDidMount(){ }

  shouldComponentUpdate(nextProps) {
    return this.props.selectedMovie.id !== nextProps.selectedMovie.id
  }

  componentDidUpdate(prevProps){
    const { selectedMovie } = this.props
    if (selectedMovie !== prevProps.selectedMovie) {
      this.handleGetCastMemberById(selectedMovie.id)
      // this.setState({ castMember: this.handleGetCastMemberById(selectedMovie.id) })
    } 
  }

  // handleGetMoviesById = async (ID) => {
  //   const movie = await getMoviesByID(ID)
	// 	console.log("TCL: ContentPane -> handleGetMoviesById -> movie", movie)
  //   return movie
  // }

  handleGetCastMemberById = async (ID) => {
    const castMember = await getCastMemberByID(ID)
		console.log("TCL: ContentPane -> handleGetCastMemberById -> castMember", castMember)
    return castMember
  }


  render(){
    console.log({selectedMovie: this.props.selectedMovie})
    return(
      <React.Fragment>
        <Row style={{ height: '100%' }}>
          <Col style={{ boxShadow: '0 3px 6px 0 rgb(225, 225, 225)' }} >
          </Col>
        </Row>
      </React.Fragment>

    )
  }
}

ContentPane.propTypes = { 
  selectedMovie: PropTypes.shape()
}
ContentPane.defaultProps = {}
