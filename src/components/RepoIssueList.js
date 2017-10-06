import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import get from 'lodash/get'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'

import Issue from './Issue'
import { fetchApi } from '../actions'

class RepoIssueList extends Component {
  constructor() {
    super()
    
    this.state = {
      sortStatus: [
        {
          field: 'created_at',
          orderBy: 'desc',
          display: {
            'asc': 'A->Z',
            'desc': 'Z->A'
          }
        },
        {
          field: 'user.login',
          orderBy: 'asc',
          display: {
            'asc': 'A->Z',
            'desc': 'Z->A'
          }
        },
        {
          field: 'title',
          orderBy: 'asc',
          display: {
            'asc': 'A->Z',
            'desc': 'Z->A'
          }
        },
        {
          field: 'state',
          orderBy: 'asc',
          display: {
            'asc': 'open->close',
            'desc': 'close->open'
          }
        }
      ]
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
    const currentOrderBy = orderStatusByField.display[orderStatusByField.orderBy]
    
    return (
      <button className="label label-default" onClick={() => {this.handleSortToggle(field)}}>
        {currentOrderBy}
      </button>
    )
  }
  
  renderLoading() {
    return (
      <h3>Fetching github issues..</h3>
    )
  }
  
  renderList() {
    return (
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
                state: get(issue, 'state', '')
              }
              
              return (<Issue 
                {...props} />)
            })}
          </tbody>
        </table>
    )
  }
  
  render() {
    console.log('Hey', this.props.isFetching)
    return this.props.isFetching ? this.renderLoading() : this.renderList()
  }
}

RepoIssueList.propTypes = {
  repoIssues: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  onSortToggle: PropTypes.func.isRequired
}

export default connect()(RepoIssueList)
