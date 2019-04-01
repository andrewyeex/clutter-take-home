import React from 'react'
import { shallow } from 'enzyme'
import { MovieContent } from './movieContent'

describe('Content Pane', () => {
  describe('Renders', () => {
    let wrapper, defaultProps
    beforeEach(() => {
      defaultProps = {
        selectedMovie: {
          overview: 'Lots of super heroes and explosions.',
          poster: '/path/to/poster',
          title: 'Robots 4'
        },
        castMembers: [
          [{
            "tmdb_id": 10980,
            "name": "Daniel Radcliffe",
            "profile_path": "/kMSMa5tR43TLMR14ahU1neFVytz.jpg"
          }]
        ],
        currentPagination: 0,
        isLoadingCastMember: false,
        handleOnNextPagination: jest.fn(),
        handleOnPrevPagination: jest.fn()
      }
      wrapper = shallow(<MovieContent {...defaultProps} />)
    })
    test('Did not crash', () => { expect(wrapper).toExist() })
    test('Loading', () => {
      expect(wrapper.find('#main-spin')).not.toExist()
      wrapper.setProps({ isLoadingCastMember: true })
      expect(wrapper.find('#main-spin')).toExist()
    })
    test('Not rendering Cast', () => {
      wrapper.setProps({ castMembers: [[]] })
      expect(wrapper.find('#movie-content').props().children[2]).toBe(false)
    })
  })
})

/*
import React from 'react'
import { shallow } from 'enzyme'
import { MovieContent } from './movieContent'

describe('Content Pane', () => {
  describe('Renders', () => {
    let wrapper, defaultProps
    beforeEach(() => { wrapper = shallow(<MovieContent />) })
    test('Did not crash', () => { expect(wrapper).toExist() })
  })
})
*/
