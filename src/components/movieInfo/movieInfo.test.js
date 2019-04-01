import React from 'react'
import { shallow } from 'enzyme'
import { MovieInfo } from './movieInfo'

describe('Content Pane', () => {
  describe('Renders', () => {
    let wrapper, defaultProps
    beforeEach(() => {
      defaultProps = {
        header: 'Overview',
        content: 'Robots are coming this summer'
      }
      wrapper = shallow(<MovieInfo {...defaultProps} />)
    })
    test('Did not crash', () => { expect(wrapper).toExist() })
    test('Renders header', () => {
      expect(wrapper.contains(defaultProps.header)).toBe(true)
    })
    test('Renders content', () => {
      expect(wrapper.contains(defaultProps.content)).toBe(true)
    })
  })
})
