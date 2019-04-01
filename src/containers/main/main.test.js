import React from 'react'
import { shallow } from 'enzyme'
import nock from 'nock'
import Main from './Main'

import * as req from '../../helpers/request'
import movies from '../../fixtures/movies.json'
import castMembers from '../../fixtures/castMember.json'

import {
  paginateArray
} from '../../helpers/utils'

global.fetch = require('node-fetch') // fetch is a browser object

describe('Main Container', () => {
  let wrapper
  beforeEach(() => { wrapper = shallow(<Main />) })

  test('renders without crashing', () => { expect(wrapper).toExist() })

  describe('handleSelectedMovie (fetches for cast member of movie)', () => {
    const selectedMovie = movies[0]

    test('successful fetch of cast member', async () => {
      const {
        id,
        title,
        overview,
        poster_path : poster,
        release_date
      } = selectedMovie
      const request = nock(req.ROOT_URL)
        .get(`/movies/${selectedMovie.id}/cast_members.json`)
        .reply(200, castMembers)
      await wrapper.instance().handleSelectedMovie(selectedMovie)
      expect(wrapper.instance().state.castMembers).toEqual(paginateArray(castMembers, 6))
      expect(wrapper.instance().state.selectedMovie).toEqual({
        id,
        poster,
        overview,
        title: title + ` (${new Date(release_date).getFullYear()})`
      })
      expect(wrapper.instance().state.currentPagination).toEqual(0)
      expect(wrapper.instance().state.isLoadingCastMember).toEqual(false)
      request.isDone()
    })
  
    test('failed fetch of cast member', async () => {
      const request = nock(req.ROOT_URL)
        .get(`/movies/${selectedMovie.id}/cast_members.json`)
        .replyWithError({
          code: 400,
          message: 'Bad Request'
        })
      await wrapper.instance().handleSelectedMovie(selectedMovie)
      expect(wrapper.instance().state.castMembers).toEqual([])
      expect(wrapper.instance().state.currentPagination).toEqual(0)
      expect(wrapper.instance().state.isLoadingCastMember).toEqual(false)
      request.isDone()
    })

    test('Same id selected', async () => {
      wrapper.setState({ selectedMovie: {id: selectedMovie.id} })
      const res = await wrapper.instance().handleSelectedMovie(selectedMovie)
      expect(res).toEqual(false)
    })
  })
  // describe('Should Component Re-Render', () => {
  //   test('re-renders when isLoadingCastMemberRequest changes value', () => {
  //     const shouldComponentUpdate = wrapper.instance().shouldComponentUpdate({},{
  //       isLoadingCastMemberRequest: true
  //     })
  //     expect(shouldComponentUpdate).toBe(true)
  //   })
  //   test('does NOT re-renders when isLoadingCastMemberRequest stays the same value', () => {
  //     const shouldComponentUpdate = wrapper.instance().shouldComponentUpdate({},{
  //       isLoadingCastMemberRequest: false
  //     })
  //     expect(shouldComponentUpdate).toBe(false)
  //   })
  // })

  // describe('Handlers', () => {
  //   test.skip('handleSelectedMovie', () => {
  //     const selectedMovie = {
  //       id: 1,
  //       title: 'test',
  //     }
  //     return expect(wrapper.instance().handleSelectedMovie(selectedMovie)).resolves.toBe(true)
  //   })
  // })

})
