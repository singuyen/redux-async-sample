import axios from 'axios'

const perPage = 100
const state = 'all'
    
export const fetchApi = (dispatch, repo = 'facebook/react') => {
  const githubAPI = `https://api.github.com/repos/${repo}/issues?per_page=${perPage}&state=${state}`

  axios.get(githubAPI)
          .then(result => { 
            dispatch(receiveRepoIssues(result.data, repo))
          })
          .catch(error => {
            console.error('Error: ' + error)
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
  type: 'FILTER_BY_FIELD',
  params: {
    field,
    orderBy
  }
})

export const showAll = () => ({
  type: 'SHOW_ALL'
})

export const sortByLabel = (labelName) => {  
  return {
    type: 'FILTER_BY_LABEL',
    params: {
      labelName
    }
  }
}

export const sortByState = (state) => {
  return {
    type: 'FILTER_BY_STATE',
    params: {
      state
    }
  }
}
  
export const resetFilter = () => ({
  type: 'RESET_FILTER'
})
