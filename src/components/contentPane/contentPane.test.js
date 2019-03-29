import React from 'react'
import { shallow } from 'enzyme'
import { ContentPane } from './contentPane'

describe('Content Pane', () => {
  let wrapper
  beforeEach(() => { wrapper = shallow(<ContentPane />) })

  test('Renders without crashing', () => { expect(wrapper).toExist() })
})
