import React from 'react'
import { shallow } from 'enzyme'
import SearchPane from './searchPane'

describe('SearchPane Container', () => {
  let wrapper
  beforeEach(() => { wrapper = shallow(<SearchPane />) })

  test('Renders without crashing', () => { expect(wrapper).toExist() })

  describe('Handlers', () => {
    test.skip('handleSearch', () => {

    })
  })

  describe('Render', () => {
    test('Search input', () => {
      expect(wrapper.exists('#search-pane-input')).toBe(true)
    })
    test('Loading Spinner', () => {

    })
  })
})
