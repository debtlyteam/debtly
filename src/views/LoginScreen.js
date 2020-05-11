import React from 'react'
import Login from '../components/Login'
import PropTypes from 'prop-types'

class Loginscreen extends React.Component {
  constructor (props) {
    super(props)
    this.actions = props.actions
  }

  static get propTypes () {
    return {
      actions: PropTypes.object
    }
  }

  render () {
    return (
      <div className="loginscreen">
        <Login/>
        <div>

        </div>
      </div>
    )
  }
}

export default Loginscreen
