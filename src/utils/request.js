/**
 * Request JS
 * Responsible for managing external request methods
 */

const ROOT_URL = 'https://clutter-front-end-interview.herokuapp.com'

const _GET = async (url, success, error ) => {
  try {
    const res = await fetch(url)
    success(res)
  } catch (e) {
    error(e)
  }
}

export const getMoviesByID = async (movieID, success, error) => _GET(`${ROOT_URL}/movies/${movieID}.json`, success, error)

export const getMoviesByTerm = async (term, success, error) => _GET(`${ROOT_URL}/movies.json?q[title_cont]=${term}`, success, error)

export const getCastMemberByID = async (castID, success, error) => _GET(`${ROOT_URL}/movies/${castID}/cast_members.json`, success, error)


