import React from 'react'
import ErrorBox from 'components/ErrorBox'
import LoadingView from 'components/LoadingView'
import LedgerView from '../LedgerView'

const HomeView = ({ user, group, ledger, currentlySending, errorMessage }) => (
  <div>
    <LedgerView ledger={ledger} group={group}/>
    <div><pre>{JSON.stringify(user, null, 2) }</pre></div>
    <div><pre>{JSON.stringify(group, null, 2) }</pre></div>
    <div><pre>{JSON.stringify(ledger, null, 2) }</pre></div>
    <LoadingView currentlySending={currentlySending} />
    <ErrorBox message={errorMessage} />
  </div>
)

export default HomeView
