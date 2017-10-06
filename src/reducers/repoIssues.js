import orderBy from 'lodash/orderBy'
import get from 'lodash/get'

const repoIssues = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_ISSUES':
      return state = action.repoIssues
    case 'RESET_ISSUES':
      return []
    case 'SORT_TOGGLE':
      const sortableField = [state => get(state, action.field).toLowerCase()]
      return orderBy(state, sortableField, [action.orderBy])
    default:
      return state
  }
}

export default repoIssues
