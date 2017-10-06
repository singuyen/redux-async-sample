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
      
      return <label key={label.id} className="label" style={labelStyle}>{label.name}</label>
    })
  }

  render() {
    const {title, author, created_at, state, avatar_url, labels} = this.props
    const renderAvatar = avatar_url ? (<img className="avatar" src={avatar_url} alt={author}/>) : null
    const renderLabels = labels.length > 0 ? this.renderLabels() : null
    return (
      <tr>
        <td>{title} {renderLabels}</td>
        <td>{author} {renderAvatar}</td>
        <td>{moment(created_at).format('DD-MM-YYYY HH:MM A')}</td>
        <td>{state}</td>
      </tr>
    )
  }
  
}

Issue.propTypes = {
  number: PropTypes.number,
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  created_at: PropTypes.string,
  avatar_url: PropTypes.string,
  labels: PropTypes.array
}

export default Issue
