import React from 'react'
import { shallow } from 'enzyme'
import { MovieCastItem } from './movieCastItem'

describe('MovieCastItem', () => {
  let wrapper
  beforeEach(() => { wrapper = shallow(<MovieCastItem />) })
  
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
