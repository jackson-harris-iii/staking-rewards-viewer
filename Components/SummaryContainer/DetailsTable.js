import React, { Fragment, useState } from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { Grid, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper, Checkbox, TablePagination } from '@material-ui/core'
import {descendingComparator, getComparator, stableSort, useStyles, isSelected} from './utils.js'
import EnhancedTableHead from './EnhancedTableHead.js'

const DetailsTable = ({details, currency}) => {

  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const rows = details

  const headCells = [
    { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
    { id: 'startBalance', numeric: true, disablePadding: false, label: 'StartBalance' },
    { id: 'endBalance', numeric: true, disablePadding: false, label: 'EndBalance' },
    { id: 'annualizedReturn', numeric: true, disablePadding: false, label: 'Annualized Return'},
    { id: 'valueFiat', numeric: true, disablePadding: false, label: `Fiat Value (${currency[1]})`},
    { id: 'network', numeric: false, disablePadding: false, label: 'Network'},
  ]


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log('changing rows per page', event.target.value)
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };


  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, details.length - page * rowsPerPage);

  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
      >
        <Grid item xs={12}>
          <TableContainer>
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            headCells={headCells}
          />

          <TableBody>
            {details ? stableSort(details, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((detail, index) => {
                const isItemSelected = isSelected(detail.name, selected);
                const labelId = `enhanced-table-checkbox-${index}`;
                // console.log('detail', detail)
                return detail.address ?
                (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, detail.name)}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={detail.name}
                    selected={isItemSelected}
                  >
                    <TableCell align="right">{detail.address}</TableCell>
                    <TableCell align="right">{detail.startBalance}</TableCell>
                    <TableCell align="right">{detail.endBalance}</TableCell>
                    <TableCell align="right">{detail.annualizedReturn}</TableCell>
                    <TableCell align="right">{detail.currentValueRewardsFiat}</TableCell>
                    <TableCell align="left">{detail.network}</TableCell>
                  </TableRow>
                ) : null;
              }): <TableRow> <TableCell /><TableCell /><TableCell /></TableRow>}
          </TableBody>
          </TableContainer>
        </Grid>
      </Grid>
    {/* {details.map((item) => {
      item.data ?
      <>
        <DayDetails daysData={item.data} />
      </>: null
    })} */}
    </>

  )
}

export default DetailsTable;