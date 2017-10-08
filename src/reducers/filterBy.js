const filterBy = (state = {type: 'SHOW_ALL'}, action) => {
  switch (action.type) {
    case 'FILTER_BY_LABEL':
    case 'FILTER_BY_FIELD':
    case 'FILTER_BY_STATE':
    case 'SHOW_ALL':
      return action
    default:
      return state
  }
}

export default filterBy