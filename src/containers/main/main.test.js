import React from 'react'
import { shallow } from 'enzyme'
import Main from './Main'

it('renders without crashing', () => {
  const wrapper = shallow(<Main />)
  expect(wrapper).toExist()
});