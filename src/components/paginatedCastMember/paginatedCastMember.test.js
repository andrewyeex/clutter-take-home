import React from 'react'
import { shallow } from 'enzyme'
import { PaginatedCastMember } from './paginatedCastMember'

import castMembers from '../../fixtures/castMember.json'

describe('PaginatedCastMember', () => {
  let wrapper
  beforeEach(() => { wrapper = shallow(<PaginatedCastMember />) })

  test('Renders without crashing', () => { expect(wrapper).toExist() })

  describe('Default Props Functions', () => {
    test('onNext', () => {
      const onNext = () => console.error('callback unavailable')
      expect(PaginatedCastMember.defaultProps.onNext()).toEqual(onNext())
    })
    test('onPrev', () => {
      const onPrev = () => console.error('callback unavailable')
      expect(PaginatedCastMember.defaultProps.onPrev()).toEqual(onPrev())
    })
  })

  describe('Renders', () => {
    test('Cast Members', () => {
      wrapper.setProps({ castMembers })
      expect(wrapper.find('#cast-member-container').props().children).toHaveLength(castMembers.length)
    })
    test('prev button', () => {
      wrapper.setProps({ current: 1 })
      expect(wrapper.find('#prev-btn').props().className).toEqual('small-circular-btn')
    })
    test('Inactive next button', () => {
      wrapper.setProps({ current : 1, size: 2 })
      expect(wrapper.find('#next-btn').props().className).toEqual('small-circular-btn inactive')
    })
  })

  describe('On Next/Prev Clicks', () => {
    test('On Next', () => {
      const onNext = jest.fn()
      wrapper.setProps({ onNext })
      wrapper.find('#next-btn').props().onClick()
      expect(onNext).toHaveBeenCalledTimes(1)
    })
    test('On Prev', () => {
      const onPrev = jest.fn()
      wrapper.setProps({ onPrev })
      wrapper.find('#prev-btn').props().onClick()
      expect(onPrev).toHaveBeenCalledTimes(1)
    })
  })

})