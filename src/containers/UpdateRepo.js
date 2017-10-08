import React from 'react'
import { connect } from 'react-redux'
import { updateRepo } from '../actions'

let UpdateRepo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        
        updateRepo(dispatch, input.value)
      }}>
        github.com/
        <input ref={node => {
          input = node
        }} placeholder="facebook/jest"/>
        &nbsp;<button type="submit">
          Update Repo
        </button>
      </form>
      <hr/>   
    </div>
  )
}

UpdateRepo = connect()(UpdateRepo)

export default UpdateRepo
