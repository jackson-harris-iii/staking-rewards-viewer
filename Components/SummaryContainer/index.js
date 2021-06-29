import React, { Fragment, useState} from 'react';
import { Container, Input, Grid, Paper, Switch, CircularProgress, Modal } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DayDetails from '../DayDetails.js'
import DetailsTable from '../DetailsTable.js'
import Summary from '../Summary.js'

const SummaryContainer = ({data, handleExport, toggleExport, setToggleExport, currency, isLoading, theme}) => {
  return (
    <>
        {
          data ?
            <>
              {/* summary */}
              <Paper elevation={3} style={{marginTop: "3em", paddingBottom: '1em', padding: '1em'}}>
                <Summary currency={currency[0]} details={data[data.length - 1].details}/>
                <DetailsTable details={data} currency={currency}/>

                {/* export button and toggles */}
                <Grid container alignItems="center" style={{marginLeft: '1em'}} spacing={4}>
                  <Grid item container xs={1} justify="center">
                    <Button
                    style={{backgroundColor:`${theme.pink}`, color: "white", marginTop: '1em'}}
                    onClick={handleExport}
                  >
                      Export
                    </Button>
                  </Grid>
                  <Grid item container alignItems="center"xs={6}>
                    <p style={{display: 'inline', marginBottom: '0', fontFamily: "Work Sans light"}}>CSV</p>
                    <div style={{marginTop: '.75em'}}>
                      <Switch inputProps={{ 'aria-label': 'primary checkbox' }} onChange={() => setToggleExport(!toggleExport)}/>
                    </div>
                    <p style={{display: 'inline', marginBottom: '0', fontFamily: "Work Sans light"}}>JSON</p>
                  </Grid>
              </Grid>

              </Paper>

              {/* daily data */}

              {
                data[0].address ?
                data.map((item) => {
                  return (
                    item.data && item.data.list ?
                      <DayDetails dayData={item}/>
                    : null
                  )
                }) : null
              }

            </>
            : <> {
              isLoading ? <Grid container style={{marginTop: '3em'}} justify="center"><CircularProgress color="pink"/></Grid> : null
            } </>
        }
    </>

  )
}

export default SummaryContainer;