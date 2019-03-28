/**
 * Utils JS
 * Assortments of useful functions
 */

export const getBaseImgURL = str => {
  if (!str) return
  const arr = str.split('/')
  return arr.slice(0, arr.length-1).join('/')
}

export const paginateArray = (arr, limit) => {
  return arr.reduce((sub, item) => {
    if (sub[sub.length - 1].length >= limit) sub.push([item])
    else sub[sub.length - 1].push(item)
    return sub
  }, [[]])
}

/**
 * Pass a string to be turned into a Date Object.
 * "2004-11-05T00:00:00.000Z" => "10/4/04"
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
