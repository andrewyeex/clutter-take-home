/**
 * Request JS
 * Responsible for managing external request methods
 */

const ROOT_URL = 'https://clutter-front-end-interview.herokuapp.com'

const _GET = async (url) => {
  try {
    let result = await fetch(url)
    result = result.json()
    return result
  } catch(e) {
    console.error(e)
    return null
  }
}

export const getMoviesByTerm = async (term) => await _GET(`${ROOT_URL}/movies.json?q[title_cont]=${term}`)

export const getCastMemberByID = async (movieID) => await _GET(`${ROOT_URL}/movies/${movieID}/cast_members.json`)
