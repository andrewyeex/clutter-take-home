import React from 'react'
import { shallow } from 'enzyme'
import { MovieSearch } from './movieSearch'

import movieResults from '../../fixtures/movies.json'

describe('MovieSearch Container', () => {
  let wrapper
  beforeEach(() => { wrapper = shallow(<MovieSearch />) })

  test('Renders without crashing', () => { expect(wrapper).toExist() })

  describe('Default Props', () => {
    test('handleSelectedMovie', () => {
      const handleSelectedMovie = () => console.error('callback unavailable')
      expect(MovieSearch.defaultProps.handleSelectedMovie()).toEqual(handleSelectedMovie())
    })
    test('handleSearch', () => {
      const handleSearch = () => console.error('callback unavailable')
      expect(MovieSearch.defaultProps.handleSearch()).toEqual(handleSearch())
    })
    test('selectedMovieID', () => {
      expect(MovieSearch.defaultProps.selectedMovieID).toEqual(-1)
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
      wrapper.setProps({ isLoadingSearchRequest: true })
      expect(wrapper.exists('#search-spin')).toBe(true)
    })
    test('NO Loading Spinner', () => {
      wrapper.setProps({ isLoadingSearchRequest: false })
      expect(wrapper.exists('#search-spin')).toBe(false)
    })
    test('Movie Results', () => {
      wrapper.setProps({ isLoadingSearchRequest: false, movieResults })
      expect(wrapper.find('#search-list-container').get(0).props.children).toHaveLength(movieResults.length)
    })
  })
})
