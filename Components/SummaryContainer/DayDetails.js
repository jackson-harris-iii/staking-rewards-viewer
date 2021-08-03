import React, { Fragment, useState } from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { Grid, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper, Checkbox, TablePagination, Tooltip, Fade, Button } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info';
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

const headCells = [
  { id: 'day', numeric: false, disablePadding: false, label: 'Date [d/m/y]' },
  { id: 'amountHumanReadable', numeric: true, disablePadding: false, label: 'Tokens' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
  { id: 'valueFiat', numeric: true, disablePadding: false, label: 'Fiat Value'},
  { id: 'numberPayouts', numeric: false, disablePadding: false, label: 'Total Payouts'},
  // { id: 'Fiat Value', numeric: true, disablePadding: false, label: `Fiat Value (${currency[1]})`},

]


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


const DayDetails = ({dayData}) => {

  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const rows = dayData.data.list;

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

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Paper elevation={3} style={{marginTop: "3em", paddingBottom: '1em', padding: '1em', overFlowY: 'auto'}} aria-label="day-details-card">
      <span>
        <h4 style={{fontFamily: "Work Sans", display: "inline-block"}}>Address: </h4>
        <p style={{display: "inline-block"}}>{dayData.address}</p>
        <div>
          <h4 style={{fontFamily: "Work Sans", display: "inline-block"}}>Network: </h4> <p style={{display: "inline-block"}}>{dayData.network.charAt(0).toUpperCase() + dayData.network.slice(1)}</p>
        </div>
      </span>
      <Grid container justify="center">
            <TableContainer component={Paper}>
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
                {dayData.data && dayData.data.list ? stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((day, index) => {
                    const isItemSelected = isSelected(day.extrinsicHash);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return day ?
                    (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, day.extrinsicHash)}
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={day.extrinsicHash}
                        selected={isItemSelected}
                        aria-label="day-details-table-row"
                      >
                        <TableCell align="right">{day.day}</TableCell>
                        <TableCell align="right">{day.amountHumanReadable.toFixed(2)}</TableCell>
                        <TableCell align="right">{day.price.toFixed(2)}</TableCell>
                        <TableCell align="right">{day.valueFiat.toFixed(2)}</TableCell>
                        <TableCell align="right">{day.numberPayouts}</TableCell>
                      </TableRow>

                    ) : null;
                  }): <TableRow> <TableCell /><TableCell /><TableCell /></TableRow>}
              </TableBody>
              <Grid container justify="flex-start">
                <Grid container item justify="flex-start" xs={10}>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, rows.length]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </Grid>
                <Grid container item xs={1} alignItems="center">
                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Missing some data? The results only show days with information even if there are additional days in you results.">
                    <InfoIcon />
                  </Tooltip>
                </Grid>
              </Grid>


            </TableContainer>
      </Grid>
    </Paper>
  )
}

export default DayDetails