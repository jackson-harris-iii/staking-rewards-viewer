import React, { Fragment, useState} from 'react';
import { Container, Input, Grid, Paper, Switch, CircularProgress, Modal, Tooltip, Fade } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info';
import DayDetails from './DayDetails.js'
import DetailsTable from './DetailsTable.js'
import Summary from './Summary.js'

const SummaryContainer = ({data, handleExport, toggleExport, setToggleExport, currency, isLoading, theme}) => {
  return (
    <>
        {
          data && !isLoading ?
            <>
              {/* summary */}
              <Paper elevation={3} style={{marginTop: "3em", paddingBottom: '1em', padding: '1em'}}>
                <Grid container justify='center'>
                <Summary currency={currency[0]} details={data[data.length - 1].details}/>
                <Container>
                  <DetailsTable details={data} currency={currency}/>
                </Container>

                {/* export button and toggles */}
                <Grid container alignItems="center" style={{marginLeft: '1em'}} spacing={4} justify="flex-start">
                  <Grid container item xs={1} alignItems="center" justify="flex-end">
                    <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Export your raw data results as either a CSV or JSON">
                      <InfoIcon />
                    </Tooltip>
                  </Grid>
                  <Grid item container xs={1} justify="center">
                    <Button
                    style={{backgroundColor:`${theme.pink}`, color: "white", marginTop: '1em'}}
                    onClick={handleExport}
                  >
                      Export
                    </Button>
                  </Grid>
                  <Grid item container alignItems="center"xs={6} justify="flex-start">
                    <p style={{display: 'inline', marginBottom: '0', fontFamily: "Work Sans light"}}>CSV</p>
                    <div style={{marginTop: '.75em'}}>
                      <Switch inputProps={{ 'aria-label': 'primary checkbox' }} onChange={() => setToggleExport(!toggleExport)}/>
                    </div>
                    <p style={{display: 'inline', marginBottom: '0', fontFamily: "Work Sans light"}}>JSON</p>
                  </Grid>
              </Grid>
              </Grid>
              </Paper>

              {/* daily data */}
              <Grid container item justify="space-around">
              {
                data[0].address ?
                data.map((item) => {
                  return (
                    item.data && item.data.list ?
                    <Grid container item md={4} justify="center">
                      <DayDetails dayData={item}/>
                    </Grid>
                    : null
                  )
                }) : null
              }
              </Grid>

            </>
            : <> {
              isLoading ? <Grid container style={{marginTop: '3em'}} justify="center"><CircularProgress color="pink"/></Grid> : null
            } </>
        }
    </>

  )
}

export default SummaryContainer;