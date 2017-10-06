import { connect } from 'react-redux'
import { sortToggle } from '../actions'
import RepoIssueList from '../components/RepoIssueList'

const getVisibleRepoIssues = (repoIssues) => repoIssues
const getFetchingStatus = (repoIssues) => {
  return repoIssues.length > 0 ? false : true
}

const mapStateToProps = (state) => ({
  repoIssues: getVisibleRepoIssues(state.repoIssues),
  isFetching: getFetchingStatus(state.repoIssues)
})

const mapDispatchToProps = {
  onSortToggle: sortToggle
}

const VisibleRepoIssueList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepoIssueList)

export default VisibleRepoIssueList
