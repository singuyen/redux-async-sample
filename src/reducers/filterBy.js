const filterBy = (state = {type: 'SHOW_ALL'}, action) => {
  switch (action.type) {
    case 'FILTER_BY_LABEL':
      return action
    case 'FILTER_BY_FIELD':
      return action
    case 'FILTER_BY_STATE':
      return action
    case 'SHOW_ALL':
      return action
    default:
      return state
  }
}

export default filterBy