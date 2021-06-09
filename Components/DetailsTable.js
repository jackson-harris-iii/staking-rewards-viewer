import React, { Fragment, useState } from 'react';
import { Grid, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper } from '@material-ui/core'


const DetailsTable = ({details, currency}) => {

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const headCells = [
    { id: 'Address', numeric: false, disablePadding: false, label: 'Address' },
    { id: 'StartBalance', numeric: true, disablePadding: false, label: 'StartBalance' },
    { id: 'EndBalance', numeric: true, disablePadding: false, label: 'EndBalance' },
    { id: 'Annualized Return', numeric: true, disablePadding: false, label: 'Annualized Return'},
    { id: 'Fiat Value', numeric: true, disablePadding: false, label: `Fiat Value (${currency[1]})`},
    { id: 'Netowrk', numeric: false, disablePadding: false, label: 'Network'},
  ]

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    console.log(array)
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, details.length - page * rowsPerPage);

  return (

    <Grid
      container
      direction="row"
      justify="center"
    >
    <TableContainer
    >
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
            <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : 'asc'}
            onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>

    <TableBody>
      {details ? stableSort(details, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((detail, index) => {
          const isItemSelected = isSelected(detail.name);
          const labelId = `enhanced-table-checkbox-${index}`;
          console.log('detail', detail)
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
              <TableCell align="right">{detail.address.slice(0,5) + '...' + detail.address.slice(-6,-1)}</TableCell>
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

  )
}

export default DetailsTable;