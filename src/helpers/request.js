/**
 * Request JS
 * Responsible for managing external request methods
 */

const ROOT_URL = 'https://clutter-front-end-interview.herokuapp.com'

const _GET = async (url) => {
  try {
    const res = await fetch(url)
    const json = res.json()
    return json
  } catch (e) {
    console.error(e)
  }
}

export const getMoviesByID = async (movieID, error) => _GET(`${ROOT_URL}/movies/${movieID}.json`)

export const getMoviesByTerm = async (term, error) => _GET(`${ROOT_URL}/movies.json?q[title_cont]=${term}`)

export const getCastMemberByID = async (castID, error) => _GET(`${ROOT_URL}/movies/${castID}/cast_members.json`)


