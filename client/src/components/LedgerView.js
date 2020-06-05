import React from 'react'
import PropTypes from 'prop-types'
import MaterialTable from 'material-table'

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

class LedgerView extends React.Component {
  render() {
    const {ledger} = this.props
    let data = (ledger == null) ? null : ledger.transactions;
    console.log(data)
    /*
    data = [
      {
      amount: 108,
      date: "2020-06-04",
      desc: "This is test data",
      num: 68,
      ower_id: "2940696473614c6823406c61",
      split: {
        "2940696473614c6823406c61": 81,
        "6b736c6b402928616a6b6440": -81,
      }
    },
    ]
    */
    console.log(data)
    return (
    <MaterialTable
    icons={tableIcons}
     title='ledger'
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
        render: rowData => <div/>
       },
     ]}
    //  data={ledger.transactions}
     data={data}

    />
    )
  }
}

export default LedgerView;