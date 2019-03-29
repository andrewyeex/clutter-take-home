import React from 'react'
import { shallow } from 'enzyme'
import { CastMemberItem } from './castMemberItem'

describe('CastMemberItem', () => {
  let wrapper
  beforeEach(() => { wrapper = shallow(<CastMemberItem />) })
  
  test('Renders without crashing', () => { expect(wrapper).toExist() })

  test('Renders image', () => {
    const img = '/path/to/image'
    wrapper.setProps({ img })
    expect(wrapper.find('.cast-member').props().children[0].props.src).toBe(img)
  })

  test('Renders name', () => {
    const name = 'andrew'
    wrapper.setProps({ name })
    expect(wrapper.find('.cast-member').props().children[1].props.children).toBe(name)
  })
})
