import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import get from 'lodash/get'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'

import { fetchApi } from '../actions'
import Issue from './Issue'

class RepoIssueList extends Component {
  constructor() {
    super()
    
    this.state = {
      sortStatus: [
        {
          field: 'created_at',
          orderBy: 'desc',
          display: {
            'asc': 'old - new',
            'desc': 'new - old'
          }
        },
        {
          field: 'user.login',
          orderBy: 'asc',
          display: {
            'asc': 'A - Z',
            'desc': 'Z - A'
          }
        },
        {
          field: 'title',
          orderBy: 'asc',
          display: {
            'asc': 'A - Z',
            'desc': 'Z - A'
          }
        },
        {
          field: 'state',
          orderBy: 'asc',
          display: {
            'asc': 'close - open',
            'desc': 'open - close'
          }
        }
      ],
      filterBy: ''
    }
  }
  
  componentDidMount() {
    const { dispatch } = this.props 
    fetchApi(dispatch)
  }
  
  updateSortStatus(field, currentOrderBy) {
    const index = findIndex(this.state.sortStatus, {'field': field})
    let orderStatusByField = find(this.state.sortStatus, {'field': field})
    orderStatusByField.orderBy = currentOrderBy
    
    this.state.sortStatus.splice(index, 1, orderStatusByField)
    
    this.setState({
      sortStatus: this.state.sortStatus
    })    
  }
  
  handleSortToggle(field) {
    const orderStatusByField = find(this.state.sortStatus, {'field': field})
    const currentOrderBy = (orderStatusByField.orderBy === 'desc') ? 'asc' : 'desc'
    
    this.updateSortStatus(field, currentOrderBy)  
    this.props.onSortToggle(field, currentOrderBy)
  }
  
  renderSortButton(field) {
    const orderStatusByField = find(this.state.sortStatus, {'field': field})
    const displayOrderBy = orderStatusByField.display[orderStatusByField.orderBy]
    
    return (
      <button className="btn" onClick={() => {this.handleSortToggle(field)}}>
        {displayOrderBy}
      </button>
    )
  }
  
  handleFilterBy(labelName) {
    this.setState({
      filterBy: labelName
    })
    this.props.onSortByLabel(labelName)
  }
  
  renderLoading() {
    return (
      <h3>Fetching github issues..</h3>
    )
  }
  
  handleShowAll() {
    this.setState({
      filterBy: ''
    })
    
    this.props.showAll() 
  }
  
  renderFilterByLabel() {
    return (
      <h4>
        Filtered by Label: <button className="btn" onClick={this.handleShowAll.bind(this)}>{this.state.filterBy} x</button>
        <hr/>
      </h4>
    )
  }
  
  renderList() {
    const filterByDisplay = this.state.filterBy.length ? this.renderFilterByLabel() : null
    
    return (
      <div>
        {filterByDisplay}
        <h5>Display first 100 issues on both 'Open' and 'Closed' issues only</h5>
        <button className="btn btn-lg" onClick={this.props.showAll.bind(this)}>Show All</button>
        <hr/>
        <table className="table table-striped">
          <tbody>
            <tr>
              <th>Title <br/>{this.renderSortButton('title')}</th>
              <th>Author <br/>{this.renderSortButton('user.login')}</th>
              <th>Created At <br/>{this.renderSortButton('created_at')}</th>
              <th>Status <br/>{this.renderSortButton('state')}</th>
            </tr>
            {this.props.repoIssues.map(issue => {
              const props = {
                key: get(issue, 'number', 0),
                title: get(issue, 'title', ''),
                author: get(issue, 'user.login', ''),
                created_at: get(issue, 'created_at', ''),
                state: get(issue, 'state', ''),
                avatar_url: get(issue, 'user.avatar_url', ''),
                labels: get(issue, 'labels', []),
                onSortByLabel: this.handleFilterBy.bind(this),
                onSortByState: this.props.onSortByState
              }
              
              return (<Issue 
                {...props} />)
            })}
          </tbody>
        </table>
      </div>
    )
  }
  
  render() {
    return this.props.isFetching ? this.renderLoading() : this.renderList()
  }
}

RepoIssueList.propTypes = {
  repoIssues: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  onSortToggle: PropTypes.func.isRequired,
  onSortByLabel: PropTypes.func.isRequired,
  onSortByState: PropTypes.func.isRequired,
  onFilterReset: PropTypes.func.isRequired,
  showAll: PropTypes.func.isRequired
}

export default connect()(RepoIssueList)
