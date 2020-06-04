import React from 'react'
import HomeView from 'components/Home/HomeView'
import { loadData } from 'actions/appActions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class HomeContainer extends React.Component {
  componentDidMount () {
    this.props.loadGroup()
    this.props.loadLedger()
  }

  render () {
    const { currentlySending, group, ledger, errorMessage } = this.props
    return <HomeView currentlySending={currentlySending} group={group} ledger={ledger} errorMessage={errorMessage} />
  }
}

const mapStateToProps = state => ({
  group: state.data.group,
  ledger: state.data.ledger,
  currentlySending: state.currentlySending,
  errorMessage: state.errorMessage
})

const mapDispatchToProps = dispatch => ({
  // TODO: we're gonna need a way to edit the `1` part of `/group/1`
  loadGroup: () => dispatch(loadData('/group/1', 'group')),
  loadLedger: () => dispatch(loadData('/ledger/1', 'ledger'))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeContainer))
