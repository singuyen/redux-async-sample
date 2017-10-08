import { combineReducers } from 'redux'
import repoIssues from './repoIssues'
import filterBy from './filterBy'

const repoIssueApp = combineReducers({
  repoIssues,
  filterBy
})

export default repoIssueApp
