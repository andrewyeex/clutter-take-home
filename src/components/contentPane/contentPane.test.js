import React from 'react'
import { shallow } from 'enzyme'
import { ContentPane } from './contentPane'

describe('Content Pane', () => {
  describe('Renders', () => {
    let wrapper
    beforeEach(() => { wrapper = shallow(<ContentPane />) })
    test('Did not crash', () => { expect(wrapper).toExist() })
    test('Shows the loading spin when isLoadingCastMemberRequest is true', () => {
      wrapper.setProps({ isLoadingCastMemberRequest: true })
      expect(wrapper.find('#main-spin')).toExist()
      expect(wrapper.find('#main-img')).not.toExist()
      expect(wrapper.find('#content-pane')).not.toExist()
    })
    test('Shows the poster/title/overview when isLoadingCastMemberRequest is false', () => {
      expect(wrapper.find('#main-spin')).not.toExist()
      expect(wrapper.find('#main-img')).toExist()
      expect(wrapper.find('#content-pane')).toExist()
    })
    test('Shows the Cast when paginatedCastMember has elements', () => {
      expect(wrapper.find('#content-pane-cast')).not.toExist()
      wrapper.setProps({
        paginatedCastMember: [[{
          name: 'andrew',
          profile_path : '/path/to/img',
          tmdb_id: 1
        }]]
      })
      expect(wrapper.find('#content-pane-cast')).toExist()
      expect(wrapper.find('#content-pane').props().className).toEqual('cast')
    })
  })
  describe('Default Props', () => {
    test('handleOnNextPagination', () => {
      const handleOnNextPagination = () => console.error('callback unavailable')
      expect(ContentPane.defaultProps.handleOnNextPagination()).toEqual(handleOnNextPagination())
    })
    test('handleOnPrevPagination', () => {
      const handleOnPrevPagination = () => console.error('callback unavailable')
      expect(ContentPane.defaultProps.handleOnPrevPagination()).toEqual(handleOnPrevPagination())
    })
  })
})
