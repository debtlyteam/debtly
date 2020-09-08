import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Container, Grid, TextField, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';


const styles = theme => (
  {
    root: {
      flexGrow: 1,
      margin: "10px 10px 20px",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
    }
  })

class AddTransactions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fixedSplits: true,
      splits: {
        name: ''
      }
    }
  }

  renderSplitColumn() {
    return(
      <div>
        <Grid>

        </Grid>
      </div>
    )
  }

  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
      <Container maxWidth='xl'>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper}>
            <TextField
              id='date'
              label='Date of Transaction'
              type='date'
              InputLabelProps={{
                shrink: true,
              }}
            />
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
            <TextField
              size='medium'
              id='standard-textarea'
              label='Description of Transaction'
              fullWidth
              multiline
            />
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>

            </Paper>
          </Grid>
        </Grid>
      </Container>
      </div>
    )
  }
}

export default withStyles(styles)(AddTransactions);