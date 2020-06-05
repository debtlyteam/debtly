import React from 'react'
import PropTypes from 'prop-types'
import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles'

import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { Box, Typography, Avatar, IconButton, Grid, Paper, Collapse } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

const styles = theme => (
{
  redText : {
    color : 'red',
    fontWeight : 'bold',
    // textShadow: '0.5px 0.5px 0px rgba(0,0,0,0.2)',
  },
  greenText : {
    color : 'green',
    fontWeight : 'bold',
    // textShadow: '0.5px 0.5px 0px rgba(0,0,0,0.2)',
  },
  plainText : {
    // color : 'black',
    fontWeight : 'bold',
    // textShadow: '0.5px 0.5px 0px rgba(0,0,0,0.2)',
  },
  splitRoot : {
    flexGrow : 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
})

class LedgerView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //TODO update size to group size!
      // expandSelectedRow : new Array(50).fill(false),
    }
  }

  renderSplitColumn(rowData) {
    const {classes} = this.props
    let user = 'ajrae.nv@gmail.com'
    console.log(rowData)
    let retval = rowData.split[user]
    if(retval == null) {
      retval = 0
    }
    let colour = classes.plainText
    if(retval < 0) {
      colour = classes.redText
    } else if (retval > 0) {
      colour = classes.greenText
    }
    return(
      <Typography className={colour}>
        {retval}
      </Typography>
    )
  }

  render() {
    const {ledger, group, classes} = this.props
    let isLoading = (ledger == null);
    let data = isLoading ? [] : ledger.transactions;
    return (
    <MaterialTable
    icons={tableIcons}
     title='Transactions'
     columns={[
       {
         title: 'Number', field: 'num',
       },
       {
         title: 'Date', field: 'date',
       },
       {
         title: 'Name', field: 'ower_id',
       },
       {
        title: 'Description', field: 'desc',
       },
       {
        title: 'Split', field: 'split',
        render: rowData => (
          <div className={classes.splitRoot}>
            <Grid container direction='column' spacing={3}>
            <Grid container spacing={3}>
              <Grid item xs>
                <Paper className={classes.paper}>
                {this.renderSplitColumn(rowData)}
                </Paper>
                </Grid>
              <Grid item>
                <IconButton
                // onClick={() =>{this.setState({expandSelectedRow[0] : true})}}
                >
                  <ExpandMoreIcon/>
                </IconButton>
                </Grid>
            </Grid>
            {/* <Collapse in={this.state.expandSelectedRow[0]}> */}
            {/* </Collapse> */}
            </Grid>
          </div>
        )
       },
     ]}
     data={data}
     isLoading={isLoading}

    />
    )
  }
}

export default withStyles(styles)(LedgerView);