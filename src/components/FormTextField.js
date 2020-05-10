import React from 'react'
import { TextField, makeStyles } from '@material-ui/core'
import mainTheme from './Theme'

const styles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}))

function FormTextField (props) {
  const classes = styles(mainTheme)
  console.log(props)
  return (
    <form className={classes.root}>
      <div>
        <TextField
        />
      </div>
    </form>
  )
}

export default FormTextField
