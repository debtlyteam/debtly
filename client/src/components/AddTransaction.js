import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AddIcon from '@material-ui/icons/Add';
import { Container, Grid, TextField, Paper, Dialog, Button, IconButton, DialogContent, DialogActions, DialogTitle, FormControl, InputLabel, Input, InputAdornment } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import MaterialTable from 'material-table';
import compose from 'recompose/compose'
import { withRouter } from 'react-router';
import tableIcons from './TableIcons';

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
      open : false,
      splits: {
        name: ''
      }
    }
  }

  renderSplitColumn() {
    return(
      <div>
        <Grid>
          <MaterialTable
          editable = {{
            onRowAdd: newData => 
            new Promise((resolve, reject) => {
              setTimeout(() => {
                
              })
            })
          }}
        title="Split"
        icons={tableIcons}
        options={{
          filtering: false,
          sorting: false,
          // toolbar: false,
          // showTitle: false,
          draggable: false,
          search: false,
          paging: false
        }}
          />
        </Grid>
      </div>
    )
  }
  
  handleClose(addNew) {
    this.setState({
      open : false
    })
    if(addNew) {
      // add this new transaction to the thing
    }
  }
  
  addNewTransaction() {
    this.setState({
      open : true
    })
  }

  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
      <IconButton onClick={() => {this.addNewTransaction()}}>
        <AddIcon/>
      </IconButton>
      <Dialog open={this.state.open} fullWidth={true} maxWidth={"xl"} onClose={() => { this.handleClose()}}>
       <DialogTitle id="form-dialog-title">Create New Transaction</DialogTitle>
        <DialogContent>
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
            <FormControl fullWidth >
              <InputLabel htmlFor='standard-adornment-amount'>Amount</InputLabel>
              <Input
                id='standard-adornment-amount'
                // TODO make currency variable
                startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                />
            </FormControl>
            </Paper>
          </Grid>
          <Grid item sm>
            <Paper className={classes.paper}>
              {this.renderSplitColumn()}
            </Paper>
          </Grid>
        </Grid>
      </Container>
</DialogContent>
<DialogActions>
  <Button onClick={() => { this.handleClose(false)}} color="primary">
    Cancel
  </Button>
  <Button onClick={() => { this.handleClose(true)}} color="primary">
    Add
  </Button>
</DialogActions>
      </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(AddTransactions);