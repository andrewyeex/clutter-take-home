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

  test('No Movie Content', () => {
    wrapper.setState({ selectedMovie: {} })
    expect(wrapper.find('#movie-content-container')).not.toExist()
  })

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
      expect(wrapper.state().castMembers).toEqual(paginateArray(castMembers, 6))
      expect(wrapper.state().selectedMovie).toEqual({
        id,
        poster,
        overview,
        title: title + ` (${new Date(release_date).getFullYear()})`
      })
      expect(wrapper.state().currentPagination).toEqual(0)
      expect(wrapper.state().isLoadingCastMember).toEqual(false)
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
      expect(wrapper.state().castMembers).toEqual([])
      expect(wrapper.state().currentPagination).toEqual(0)
      expect(wrapper.state().isLoadingCastMember).toEqual(false)
      request.isDone()
    })
    test('Same id selected', async () => {
      wrapper.setState({ selectedMovie: {id: selectedMovie.id} })
      const res = await wrapper.instance().handleSelectedMovie(selectedMovie)
      expect(res).toEqual(false)
    })
  })

  describe('handleSearch', () => {
    test('a valid term, successful fetch', async () => {
      const request = nock(req.ROOT_URL)
        .get('/movies.json?q[title_cont]=term')
        .reply(200, movies)
      await wrapper.instance().handleSearch('term')
      expect(wrapper.state().isLoadingSearch).toEqual(false)
      expect(wrapper.state().selectedMovie).toEqual({})
      expect(wrapper.state().movieResults).toEqual(movies)
      request.isDone()
    })
    test('falsy term', async () => {
      expect(await wrapper.instance().handleSearch('')).toEqual(false)
    })
    test('failed fetch of movies', async () => {
      const request = nock(req.ROOT_URL)
      .get('/movies.json?q[title_cont]=term')
      .replyWithError({
        code: 400,
        message: 'Bad Request'
      })
      await wrapper.instance().handleSearch('term')
      expect(wrapper.state().movieResults).toEqual([])
      expect(wrapper.state().isLoadingSearch).toEqual(false)
      request.isDone()
    })
  })

  describe('handleOnNextPagination', () => {
    test('When theres more pages to go through', () => {
      wrapper.setState({ currentPagination: 0, castMembers: [[],[]] })
      expect(wrapper.state().currentPagination).toEqual(0)
      wrapper.instance().handleOnNextPagination()
      expect(wrapper.state().currentPagination).toEqual(1)
    })
    test('When theres are pages left', () => {
      wrapper.setState({ currentPagination: 0, castMembers: [[]] })
      expect(wrapper.state().currentPagination).toEqual(0)
      wrapper.instance().handleOnNextPagination()
      expect(wrapper.state().currentPagination).toEqual(0)
    })
  })

  describe('handleOnPrevPagination', () => {
    test('When at the beginning', () => {
      wrapper.setState({ currentPagination: 0 })
      expect(wrapper.state().currentPagination).toEqual(0)
      wrapper.instance().handleOnPrevPagination()
      expect(wrapper.state().currentPagination).toEqual(0)
    })
    test('When theres are pages left backtrack to', () => {
      wrapper.setState({ currentPagination: 1 })
      expect(wrapper.state().currentPagination).toEqual(1)
      wrapper.instance().handleOnPrevPagination()
      expect(wrapper.state().currentPagination).toEqual(0)
    })
  })
})
