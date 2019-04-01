import React from 'react'
import { shallow } from 'enzyme'
import { MovieCast } from './movieCast'

describe('MovieCast', () => {
  let wrapper, props
  beforeEach(() => {
    props = {
      currentPagination: 0,
      imgBaseURL: 'http://fake.url',
      handleOnNextPagination: jest.fn(),
      handleOnPrevPagination: jest.fn()
    }
    wrapper=shallow(<MovieCast {...props} />)
  })
  test('Does not crash', () => {
    expect(wrapper).toExist()
  })
  test('Empty Cast Member', () => {
    expect(wrapper.find('#cast-member-container').children()).toHaveLength(0)
  })
  test('Cast Member is not an array', ()=> {
    wrapper.setProps({ castMembers: undefined })
    expect(wrapper.find('#cast-member-container').children()).toHaveLength(0)
  })
  test('Has Cast Member', () => {
    wrapper.setProps({
      castMembers: [{
        "tmdb_id": 10980,
        "name": "Daniel Radcliffe",
        "profile_path": "/kMSMa5tR43TLMR14ahU1neFVytz.jpg"
      }]
    })
    expect(wrapper.find('#cast-member-container').children()).toHaveLength(1)
  })
  describe('Cover Branches', () => {
    test('MovieCastItem has no img', () => {
      wrapper.setProps({
        castMembers: [{
          "tmdb_id": 10980,
          "name": "Daniel Radcliffe"
          // missing profile_path
        }]
      })
      expect(wrapper.find('#cast-member-container').props().children[0].props.img).toBe('')
    })
    test('In between pagination', () => {
      wrapper.setProps({ currentPagination: 1 })
      expect(wrapper.find('#prev-btn').props().className).toBe('')
    })
    test('At the end of pagination', () => {
      wrapper.setProps({ currentPagination: 1, castSize: 2 })
      expect(wrapper.find('#next-btn').props().className).toBe(' inactive')
    })
  })
})