import React from 'react'
import { shallow } from 'enzyme'
import { MovieSearch } from './movieSearch'

import movieResults from '../../fixtures/movies.json'

describe('MovieSearch Container', () => {
  let wrapper, defaultProps
  beforeEach(() => {
    defaultProps = {
      isLoadingSearch: false,
      selectedMovieID: 1,
      handleSearch: jest.fn(),
      handleSelectedMovie: jest.fn(),
      movieResults
    }
    wrapper = shallow(<MovieSearch {...defaultProps} />)
  })

  test('Renders without crashing', () => { expect(wrapper).toExist() })

  describe('Handlers', () => {
    test('handleSearch', () => {
      wrapper.find('#movie-search-input').props().onSearch()
      expect(defaultProps.handleSearch).toBeCalledTimes(1)
    })
    test('handleSelectedMovie', () => {
      wrapper.find('#movie-search-list-container').get(0).props.children[0].props.handleOnClick()
      expect(defaultProps.handleSelectedMovie).toBeCalledTimes(1)
    })
  })

  describe('Render', () => {
    test('Search input', () => {
      expect(wrapper.exists('#movie-search-input')).toBe(true)
    })
    test('Loading Spinner', () => {
      expect(wrapper.exists('#search-spin')).not.toBe(true)
      wrapper.setProps({ isLoadingSearch: true })
      expect(wrapper.exists('#search-spin')).toBe(true)
    })
    test('Movie Results', () => {
      wrapper.setProps({ isLoadingSearch: false, movieResults })
      expect(wrapper.find('#movie-search-list-container').get(0).props.children).toHaveLength(movieResults.length)
    })
  })
})
