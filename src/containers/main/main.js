import React, { Component } from 'react'
import { Row, Col } from 'antd'

import SearchPane from '../searchPane/searchPane'
import ContentPane from '../contentPane/contentPane'

import 'antd/dist/antd.css'

export default class Main extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col xs={24} sm={24} md={14} lg={16} xl={18}>
            <ContentPane />
          </Col>
          <Col xs={24} sm={24} md={10} lg={8} xl={6}>
            <SearchPane />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
