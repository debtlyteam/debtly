import React from 'react'
import PropTypes from 'prop-types'
import MenuIcon from '@material-ui/icons/Menu'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'

class SideBar extends React.Component {
  render () {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" aria-label="menu" color='inherit'>
            <MenuIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
    )
  }
}

export default SideBar
