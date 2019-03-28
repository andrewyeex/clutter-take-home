import React from 'react'
import ReactDOM from 'react-dom'
import CastMemberItem from './castMemberItem'
import { shallow, mount, render } from 'enzyme'

it('renders without crashing', () => {
  const wrapper = shallow(<CastMemberItem />)
  expect(wrapper.contains(<div id='cast-member' />)).to.equal(true);
});