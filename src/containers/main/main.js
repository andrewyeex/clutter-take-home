import React, { Component } from 'react'
import { Row, Col } from 'antd'

import SearchPane from '../searchPane/searchPane'
import ContentPane from '../contentPane/contentPane'

import 'antd/dist/antd.css'

export default class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedMovie : {}
    }
  }

  handleSelectedMovie = (selectedMovie) => this.setState({ selectedMovie })

  render() {
    return (
      <React.Fragment>
        <Row style={{ background: '#f3f3f3' }}>
          <Col xs={24} sm={24} md={14} lg={16} xl={18}>
            <ContentPane selectedMovie={this.state.selectedMovie}/>
          </Col>
          <Col xs={24} sm={24} md={10} lg={8} xl={6}>
            <SearchPane
              handleSelectedMovie={this.handleSelectedMovie}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
