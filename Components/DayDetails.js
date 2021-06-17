import React, { Fragment, useState } from 'react';
import { Grid, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper } from '@material-ui/core'

const DayDetails = ({dayData}) => {

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
    // console.log(array)
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

  const headCells = [
    { id: 'Date', numeric: false, disablePadding: false, label: 'Date [d/m/y]' },
    { id: 'Amount', numeric: true, disablePadding: false, label: 'Amount' },
    { id: 'Price', numeric: true, disablePadding: false, label: 'Price' },
    { id: 'Fiat Value', numeric: true, disablePadding: false, label: 'Fiat Value'},
    { id: 'Total Payouts', numeric: false, disablePadding: false, label: 'Total Payouts'},
    // { id: 'Fiat Value', numeric: true, disablePadding: false, label: `Fiat Value (${currency[1]})`},

  ]

  return (
    <Paper elevation={3} style={{marginTop: "3em", paddingBottom: '1em', padding: '1em', overFlowY: 'auto'}}>
      <span>
        <h4 style={{fontFamily: "Work Sans", display: "inline-block"}}>Address: </h4>
        <p style={{display: "inline-block"}}>{dayData.address}</p>
        <div>
          <h4 style={{fontFamily: "Work Sans", display: "inline-block"}}>Network: </h4> <p style={{display: "inline-block"}}>{dayData.network}</p>
        </div>
      </span>
      <Grid container justify="center">
            <TableContainer>
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
                {dayData.data && dayData.data.list ? stableSort(dayData.data.list, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((day, index) => {
                    const isItemSelected = isSelected(day.extrinsicHash);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    // console.log('detail', detail)
                    return day.extrinsicHash ?
                    (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, day.extrinsicHash)}
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={day.extrinsicHash}
                        selected={isItemSelected}
                      >
                        <TableCell align="right">{day.day}</TableCell>
                        <TableCell align="right">{day.amountHumanReadable}</TableCell>
                        <TableCell align="right">{day.price}</TableCell>
                        <TableCell align="right">{day.valueFiat}</TableCell>
                        <TableCell align="right">{day.numberPayouts}</TableCell>
                      </TableRow>
                    ) : null;
                  }): <TableRow> <TableCell /><TableCell /><TableCell /></TableRow>}
              </TableBody>

            </TableContainer>
      </Grid>


      {/* <Grid
        container
        direction="row"
        justify="center"
      >
        <Grid item xs={12}>
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
      </Grid> */}
    </Paper>
  )
}

export default DayDetails