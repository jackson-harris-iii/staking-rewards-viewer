import React, { Fragment, useState } from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { Grid, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper, Checkbox, TablePagination } from '@material-ui/core'
import EnhancedTableHead from './EnhancedTableHead.js'

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

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
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

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
                return detail.address ?
                (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, detail.name)}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={detail.name}
                    selected={isItemSelected}
                    aria-label="details-table-row"
                  >
                    <TableCell align="right">{detail.address}</TableCell>
                    <TableCell align="right">{detail.startBalance || 0}</TableCell>
                    <TableCell align="right">{detail.network === 'polkadot' ? details[details.length - 1].details.numberPayouts.DOT + detail.startBalance || 0 : detail.startBalance || 0 + details[details.length - 1].details.numberPayouts.KSM }</TableCell>
                    <TableCell align="right">{
                    detail.annualizedReturn === 0 ||detail.annualizedReturn === Infinity ? 'Could not be calculated'
                    :
                    typeof detail.annualizedReturn === typeof "number" ? `${detail.annualizedReturn.toFixed(2)}% `: 'Could not calculate'
                    }</TableCell>
                    <TableCell align="right">{detail.currentValueRewardsFiat}</TableCell>
                    <TableCell align="left">{detail.network.charAt(0).toUpperCase() + detail.network.slice(1)}</TableCell>
                  </TableRow>
                ) : null;
              }): <TableRow> <TableCell /><TableCell /><TableCell /></TableRow>}
          </TableBody>
          </TableContainer>
        </Grid>
      </Grid>
    </>

  )
}

export default DetailsTable;