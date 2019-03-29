/**
 * Utils JS
 * Assortments of useful functions
 */

/**
 * Input: 'http://image.tmdb.org/t/p/w185/1234567.jpg'
 * Output: 'http://image.tmdb.org/t/p/w185'
 * @param {String} str
 */
export const getBaseImgURL = str => {
  if (!str) return
  const arr = str.split('/')
  return arr.slice(0, arr.length-1).join('/')
}

/**
 * Input: arr = [1,2,3,4,5,6,7,8,9] and limit = 3
 * Output: [ [1,2,3], [4,5,6], [7,8,9] ]
 * @param {Array} arr
 * @param {Number} limit
 */
export const paginateArray = (arr, limit) => {
  return arr.reduce((sub, item) => {
    if (sub[sub.length - 1].length >= limit) sub.push([item])
    else sub[sub.length - 1].push(item)
    return sub
  }, [[]])
}

/**
 * Input: '2004-11-05T00:00:00.000Z'
 * Output: '11/04/2004'
 * @param {string} str
 * @returns {string}
 */
export const formatDate = str => {
  if (Number.isNaN(Date.parse(str))) return
  const date = new Date(str)
  return (1 + date.getMonth()).toString().padStart(2, '0') + '/' + 
        date.getDate().toString().padStart(2, '0') + '/' +
        date.getFullYear()
}
