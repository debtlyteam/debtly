import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles'

import { Box, Typography, Avatar, IconButton, Grid, Paper, Collapse, Container } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import tableIcons from 'components/TableIcons'

const styles = theme => (
  {
    root: {
      flexGrow: 1,
      margin: "10px 10px 20px",
    },
    redText: {
      color: 'red',
      fontWeight: 'bold'
    },
    greenText: {
      color: 'green',
      fontWeight: 'bold'
    },
    plainText: {
    // color : 'black',
      fontWeight: 'bold'
    },
    splitRoot: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary
    }
  })

class LedgerView extends React.Component {
  constructor (props) {
    super(props)
    // this.users = JSON.stringify(props.group, null, 2)
    // console.log(this.users)
    this.state = {
      expandRow: new Array(50).fill(false)
    }
  }

  renderSplitColumn (data) {
    const { classes } = this.props
    if (data == null) {
      data = 0
    }
    let colour = classes.plainText
    if (data < 0) {
      colour = classes.redText
    } else if (data > 0) {
      colour = classes.greenText
    }
    return this.renderPaperNumber(colour, data)
  }

  renderAmountColumn (data, user) {
    const { classes } = this.props
    return this.renderPaperNumber(classes.plainText, data)
  }

  renderPaperNumber (typographyClassName, number) {
    const { classes } = this.props
    const negative = number < 0 ? '-' : ''
    const dollarValue = negative + '$' + Math.abs(number).toString(10)
    return (
      <Paper className={classes.paper}>
        <Typography className={typographyClassName}>
          {dollarValue}
        </Typography>
      </Paper>
    )
  }

  displayExpandedSplitView (splitData) {
    // todo: move this to happen earlier?
    const data = []
    for (const row in splitData) {
      data.push({
        email: row,
        amount: splitData[row]
      })
    }
    return (
      <MaterialTable
        title='Split'
        data={data}
        icons={tableIcons}
        columns={[
          { title: 'Person', field: 'email' },
          { title: 'Amount', field: 'amount' }
        ]}
        options={{
          filtering: false,
          sorting: false,
          toolbar: false,
          showTitle: false,
          draggable: false,
          search: false,
          paging: false
        }}
      />
    )
  }

  handleExpandClick (rowData) {
    const newArr = this.state.expandRow.slice()
    newArr[rowData.tableData.id] = !this.state.expandRow[rowData.tableData.id]
    this.setState({ expandRow: newArr })
  }

  render () {
    const { group, classes, user } = this.props

    const selectedGroup = group.group
    const groupName = selectedGroup == null ? 'Loading...' : selectedGroup.name
    const title = 'Transactions for ' + groupName

    return (
      
      <div className={classes.root}>
      <Container maxWidth='xl'>
        <MaterialTable
          icons={tableIcons}
          title={title}
          data={query =>
            new Promise((resolve, reject) => {
              let url = '/api/ledger/'
              url += '1'
              url += '?total=' + query.pageSize
              url += '&page=' + query.page
              fetch(url, { credentials: 'same-origin' })
                .then(response => response.json())
                .then(result => {
                  resolve({
                    data: result.transactions,
                    page: result.page,
                    totalCount: result.totalItems
                  })
                })
            })
          }
          columns={[
            {
              title: 'Number', field: 'num'
            },
            {
              title: 'Date', field: 'date'
            },
            {
              title: 'Name', field: 'ower_id'
            },
            {
              title: 'Description', field: 'desc'
            },
            {
              title: 'Amount',
              field: 'amount',
              render: rowData => (
                // <div/>
                this.renderAmountColumn(rowData.amount, user.email)
              )
            },
            {
              title: 'Split',
              field: 'split',
              render: rowData => (
                <div className={classes.splitRoot}>
                  <Grid container direction='column' spacing={3}>
                    <Grid container spacing={3}>
                      <Grid item>
                        <IconButton
                          onClick={() => {
                            this.handleExpandClick(rowData)
                          }}
                        >
                          {this.state.expandRow[rowData.tableData.id] ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                        </IconButton>
                      </Grid>
                      <Grid item xs>
                        {this.renderSplitColumn(rowData.split[user.email])}
                      </Grid>
                    </Grid>
                    <Collapse in={
                      this.state.expandRow[rowData.tableData.id]
                    }>
                      <div>
                        { this.state.expandRow[rowData.tableData.id] ? this.displayExpandedSplitView(rowData.split) : null}
                      </div>
                    </Collapse>
                  </Grid>
                </div>
              )
            }
          ]}

        />
      </Container></div>
    )
  }
}

export default withStyles(styles)(LedgerView)
