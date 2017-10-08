const repoIssues = (state = [], action) => {  
  switch (action.type) {
    case 'LOAD_ISSUES':
    case 'RESET_ISSUES':
      return state = action.repoIssues
    default:
      return state
  }
}

export default repoIssues
