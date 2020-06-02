import React from 'react'
import ErrorBox from 'components/ErrorBox'
import LoadingView from 'components/LoadingView'

const ProtectedView = ({ data, currentlySending, errorMessage }) => (
  <div>
    <h2>This is a protected page!</h2>
    <div>{data}</div>
    <LoadingView currentlySending={currentlySending} />
    <ErrorBox message={errorMessage} />
  </div>
)

export default ProtectedView
