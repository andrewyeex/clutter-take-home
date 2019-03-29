import * as req from './request'
jest.mock('./request.js')

describe('Request', () => {
  describe('Success', () => {
    test('getMoviesByTerm', async () => {
      expect.assertions(1)
      const res = await req.getMoviesByTerm('term')
      expect(res).toEqual()
    })
  })
})