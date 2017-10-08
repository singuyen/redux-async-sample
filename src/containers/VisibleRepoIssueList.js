import { connect } from 'react-redux'
import orderBy from 'lodash/orderBy'
import get from 'lodash/get'
import filter from 'lodash/filter'
import findIndex from 'lodash/findIndex'

import { sortToggle, sortByLabel, resetFilter, showAll, sortByState } from '../actions'
import RepoIssueList from '../components/RepoIssueList'

const getVisibleRepoIssues = (repoIssues, action) => {  
  switch (action.type) {
    case 'SHOW_ALL':
      return repoIssues
    case 'FILTER_BY_LABEL':
      return repoIssues.reduce((acc, issue) => {
        if (findIndex(issue.labels, {'name': action.params.labelName}) > -1) {
            acc.push(issue)
        }
        
        return acc
      }, [])
    case 'FILTER_BY_FIELD':
      const sortableField = [repoIssues => get(repoIssues, action.params.field).toLowerCase()]
      return orderBy(repoIssues, sortableField, [action.params.orderBy])
    case 'FILTER_BY_STATE':
      return filter(repoIssues, {'state': action.params.state})
    default:
      throw new Error('Unknown filter type: ' + action.type)
  }
}

const getFetchingStatus = (repoIssues) => {
  return repoIssues.length > 0 ? false : true
}

const mapStateToProps = (state) => ({
  repoIssues: getVisibleRepoIssues(state.repoIssues, state.filterBy),
  isFetching: getFetchingStatus(state.repoIssues)
})

const mapDispatchToProps = {
  onSortToggle: sortToggle,
  onSortByLabel: sortByLabel,
  onFilterReset: resetFilter,
  onSortByState: sortByState,
  showAll: showAll
}

const VisibleRepoIssueList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepoIssueList)

export default VisibleRepoIssueList
