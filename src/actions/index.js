import axios from 'axios'

const perPage = 100
const state = 'all'
    
export const fetchApi = (dispatch, repo = 'facebook/react') => {
  const githubAPI = `https://api.github.com/repos/${repo}/issues?per_page=${perPage}&state=${state}`

  axios.get(githubAPI)
       .then(result => { 
          console.log(result.data)
          dispatch(receiveRepoIssues(result.data, repo))
        })
}  

export const updateRepo = (dispatch, repo) => {
  dispatch(resetRepoIssues())
  fetchApi(dispatch, repo)
}

export const resetRepoIssues = () => ({
  type: 'RESET_ISSUES',
  repoIssues: []
})

export const receiveRepoIssues = (data) => ({
  type: 'LOAD_ISSUES',
  repoIssues: data
})

export const sortToggle = (field, orderBy) => ({
  type: 'SORT_TOGGLE',
  field,
  orderBy
})
