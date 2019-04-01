import * as utils from './utils'
import { util } from 'node-forge';

describe('Utils', () => {
  test('getBaseImgURL', () => {
    const input = 'http://image.tmdb.org/t/p/w185/1234567.jpg'
    const output = 'http://image.tmdb.org/t/p/w185'
    expect(utils.getBaseImgURL(input)).toEqual(output)
  })
  test('paginateArray', () => {
    const input = [1,2,3,4,5,6,7,8,9]
    const output = [ [1,2,3], [4,5,6], [7,8,9] ]
    expect(utils.paginateArray(input, 3)).toEqual(output)
  })
  test('formatDate', () => {
    const input = '2004-11-05T00:00:00.000Z'
    const output = '11/04/2004'
    expect(utils.formatDate(input)).toEqual(output)
  })
  test('sanitize', () => {
    const input = 'monster (inc.)'
    const output = 'monster  inc'
    expect(utils.sanitize(input)).toEqual(output)
  })
  describe('Incorrect Params', () => {
    test('getBaseImgURL()', () => {
      expect(utils.getBaseImgURL()).toBe(undefined)
    })
    test('formatDate()', () => {
      expect(utils.formatDate()).toBe(undefined)
    })
    test('paginateArray()', () => {
      expect(utils.paginateArray()).toEqual([[]])
    })
    test('sanitize()', () => {
      expect(utils.sanitize()).toBe(false)
    })
  })
})
