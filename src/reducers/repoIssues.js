const repoIssues = (state = [], action) => {  
  switch (action.type) {
    case 'LOAD_ISSUES':
      return state = action.repoIssues
    default:
      return state
  }
}

export default repoIssues
