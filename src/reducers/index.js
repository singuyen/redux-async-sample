import { combineReducers } from 'redux'
import repoIssues from './repoIssues'

const repoIssueApp = combineReducers({
  repoIssues
})

export default repoIssueApp
