import React from 'react'
import { shallow } from 'enzyme'
import { MovieCastButton } from './MovieCastButton'

describe('<MovieCastButton />', () => {
  const defaultProps = {
    id: '1',
    onClick: jest.fn(),
    className: '',
  }
  const wrapper = shallow(<MovieCastButton {...defaultProps} />)

  test('render', () => {
    expect(wrapper).toExist()
  })
  test('onClick', () => {
    wrapper.props().onClick()
    expect(defaultProps.onClick).toBeCalledTimes(1)
  })
})
