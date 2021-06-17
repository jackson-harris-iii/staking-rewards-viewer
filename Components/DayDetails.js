import React, { Fragment, useState } from 'react';
import { Grid, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper } from '@material-ui/core'

const DayDetails = ({dayData}) => {
  return (
    <Paper elevation={3} style={{marginTop: "3em", paddingBottom: '1em', padding: '1em', overFlowY: 'auto'}}>
      <span>
        <h4>Address: {dayData.address}</h4>
        <h4>Network: {dayData.network}</h4>
      </span>
      <Grid container justify="center">
        <Grid item xs={10}>
          <p>table goes here</p>
        </Grid>
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