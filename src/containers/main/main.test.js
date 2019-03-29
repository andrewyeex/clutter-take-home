import React from 'react'
import { shallow } from 'enzyme'
import Main from './Main'

jest.mock('../../helpers/request')

describe('Main Container', () => {

  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Main />)
  })

  test('renders without crashing', () => { expect(wrapper).toExist() })

  describe('Should Component Re-Render', () => {
    test('re-renders when isLoadingCastMemberRequest changes value', () => {
      const shouldComponentUpdate = wrapper.instance().shouldComponentUpdate({},{
        isLoadingCastMemberRequest: true
      })
      expect(shouldComponentUpdate).toBe(true)
    })
    test('does NOT re-renders when isLoadingCastMemberRequest stays the same value', () => {
      const shouldComponentUpdate = wrapper.instance().shouldComponentUpdate({},{
        isLoadingCastMemberRequest: false
      })
      expect(shouldComponentUpdate).toBe(false)
    })
  })

  describe('Handlers', () => {
    test('handleSelectedMovie', () => {
      const selectedMovie = {
        id: 1,
        title: 'test',
      }
      console.log({i : wrapper.instance().handleSelectedMovie})
      return expect(wrapper.instance().handleSelectedMovie(selectedMovie)).resolves.toBe(true)
    })
  })

  describe('Render', () => {
    test('ContentPane Container', () => {})
    test('SearchPane Container', () => {})
  })
})
