import React from 'react'
import { shallow } from 'enzyme'
import SearchPane from './searchPane'

import movieResults from '../../fixtures/movies.json'

describe('SearchPane Container', () => {
  let wrapper
  beforeEach(() => { wrapper = shallow(<SearchPane />) })

  test('Renders without crashing', () => { expect(wrapper).toExist() })

  describe('Default Props', () => {
    test('handleSelectedMovie', () => {
      const handleSelectedMovie = () => console.error('callback unavailable')
      expect(SearchPane.defaultProps.handleSelectedMovie()).toEqual(handleSelectedMovie())
    })
    test('selectedMovieID', () => {
      expect(SearchPane.defaultProps.selectedMovieID).toEqual(-1)
    })
  })

  describe('Handlers', () => {
    test.skip('handleSearch', () => { })
  })

  describe('Render', () => {
    test('Search input', () => {
      expect(wrapper.exists('#search-pane-input')).toBe(true)
    })
    test('Loading Spinner', () => {
      wrapper.setState({ isLoadingSearchRequest: true })
      expect(wrapper.exists('#search-spin')).toBe(true)
    })
    test('NO Loading Spinner', () => {
      wrapper.setState({ isLoadingSearchRequest: false })
      expect(wrapper.exists('#search-spin')).toBe(false)
    })
    test('Movie Results', () => {
      wrapper.setState({ isLoadingSearchRequest: false, movieResults })
      expect(wrapper.find('#search-list-container').get(0).props.children).toHaveLength(movieResults.length)
    })
  })
})
