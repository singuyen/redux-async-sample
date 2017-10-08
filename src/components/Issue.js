import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

class Issue extends Component {
  
  renderLabels() {
    return this.props.labels.map((label) => {
      const defaultColor = '333'
      const labelStyle = {
        backgroundColor: `#${label.color || defaultColor}`
      }
      
      return <label key={label.id} className="label" style={labelStyle} onClick={() => this.props.onSortByLabel(label.name)}>{label.name}</label>
    })
  }
  
  renderStateButton(state) {
    const btnClassName = state === 'open' ? 'btn btn-success' : 'btn btn-danger'
    
    return <button onClick={() => { this.props.onSortByState(state)}} className={btnClassName}>{state}</button>
  }

  render() {
    const {title, author, created_at, state, avatar_url, labels} = this.props
    const renderAvatar = avatar_url ? (<img className="avatar" src={avatar_url} alt={author}/>) : null
    const renderLabels = labels.length > 0 ? this.renderLabels() : null
    
    return (
      <tr>
        <td><h5>{title}</h5> {renderLabels}</td>
        <td>{author} {renderAvatar}</td>
        <td>{moment(created_at).format('DD-MM-YYYY HH:MM A')}</td>
        <td>{this.renderStateButton(state)}</td>
      </tr>
    )
  }
  
}

Issue.propTypes = {
  number: PropTypes.number,
  title: PropTypes.string,
  author: PropTypes.string,
  created_at: PropTypes.string,
  avatar_url: PropTypes.string,
  labels: PropTypes.array,
  onSortByState: PropTypes.func,
  onSortByLabel: PropTypes.func
}

export default Issue
