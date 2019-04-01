import nock from 'nock'
import * as req from './request'

import movies from '../fixtures/movies.json'
import castMembers from '../fixtures/castMember.json'

global.fetch = require('node-fetch') // fetch is a browser object

describe('Request', () => {
  describe('Success', () => {
    test('getMoviesByTerm', async () => {
      expect.assertions(1)
      const request = nock(req.ROOT_URL)
        .get('/movies.json?q[title_cont]=term')
        .reply(200, movies)
      const result = await req.getMoviesByTerm('term')
      expect(result).toEqual(movies)
      request.isDone()
    })
    test('getCastMemberByID', async () => {
      expect.assertions(1)
      const request = nock(req.ROOT_URL)
        .get('/movies/1/cast_members.json')
        .reply(200, castMembers)
      const result = await req.getCastMemberByID(1)
      expect(result).toEqual(castMembers)
      request.isDone()
    })
  })
  describe('Failed', () => {
    test('getMoviesByTerm', async () => {
      expect.assertions(1)
      const request = nock(req.ROOT_URL)
        .get('/movies.json?q[title_cont]=term')
        .replyWithError({
          code: 400,
          message: 'Bad Request'
        })
      const result = await req.getMoviesByTerm('term')
      expect(result).toEqual(null)
      request.isDone()
    })
    test('getCastMemberByID', async () => {
      expect.assertions(1);
      const request = nock(req.ROOT_URL)
        .get('/movies/1/cast_members.json')
        .replyWithError({
          code: 400,
          message: 'Bad Request'
        })
      const result = await req.getCastMemberByID(1)
      expect(result).toEqual(null)
      request.isDone()
    })
  })
})
