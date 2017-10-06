import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const Issue = ({ title, author, created_at, state }) => (
  <tr>
    <td>{title}</td>
    <td>{author}</td>
    <td>{moment(created_at).format('DD-MM-YYYY HH:MM A')}</td>
    <td>{state}</td>
  </tr>
)

Issue.propTypes = {
  number: PropTypes.number,
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  created_at: PropTypes.string
}

export default Issue
