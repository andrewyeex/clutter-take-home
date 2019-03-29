import React from 'react'
import { shallow } from 'enzyme'
import { MovieItem } from './movieItem'

describe('Movie Item', () => {
  let wrapper, defaultProps
  beforeEach(() => {
    defaultProps = {
      poster_path: '',
      title: 'default',
      release_date: '2004-11-05T00:00:00.000Z',
      selectedMovieID: -1,
      handleOnClick: () => console.error('callback unavailable')
    }
    wrapper = shallow(<MovieItem />)
  })

  test('Renders without crashing', () => { expect(wrapper).toExist() })

  describe('Default Props', () => {
    test('handleOnClick', () => {
      expect(MovieItem.defaultProps.handleOnClick()).toEqual(defaultProps.handleOnClick())
    })
  })

  test('Handles onClick', () => {
    const handleOnClick = jest.fn()
    wrapper.setProps({ handleOnClick })
    wrapper.find('.movie-item').props().onClick()
    expect(handleOnClick).toHaveBeenCalledTimes(1)
  })

  describe('Renders', () => {
    test('Renders the className `Selected` when id === selectedMovieID', () => {
      wrapper.setProps({ id: 1, selectedMovieID: 1 })
      expect(wrapper.find('.movie-item').props().className).toEqual('movie-item selected')
    })
    test('Does NOT render the className `Selected` when id !== selectedMovieID', () => {
      wrapper.setProps({ id: 0, selectedMovieID: 1 })
      expect(wrapper.find('.movie-item').props().className).toEqual('movie-item')
    })
    test('Renders an image', () => {
      const poster_path = '/path/to/image'
      wrapper.setProps({ poster_path })
      expect(wrapper.find('.movie-item-avatar').props().src).toEqual(poster_path)
    })
  })
})