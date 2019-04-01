import React from 'react'
import { shallow } from 'enzyme'
import { MovieLoading } from './movieLoading'

describe('Content Pane', () => {
  describe('Renders', () => {
    let wrapper, defaultProps
    beforeEach(() => {
      defaultProps = { id: 'spinner' }
      wrapper = shallow(<MovieLoading {...defaultProps} />) })
    test('Did not crash', () => { expect(wrapper).toExist() })
    test('id', () => { expect(wrapper.props().id).toBe(defaultProps.id) })
  })
})
