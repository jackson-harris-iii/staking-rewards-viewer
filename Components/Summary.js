import React from 'react'
import {Grid, Paper} from '@material-ui/core'

const Summary = ({details, currency}) => (
  <Grid container justify="center">
    <Grid item xs={10}>
      <h2 style={{fontFamily: "Work Sans light"}}>Summary</h2>
      <hr/>
      <p style={{fontFamily: "Work Sans"}}>In total, {details.numberPayouts.DOT} DOT and {details.numberPayouts.KSM} KSM payouts were found.</p>
      <p style={{fontFamily: "Work Sans"}}>The sum of staking rewards are {details.totalStaked.DOT} and {details.totalStaked.KSM}, which sums up to a total of {currency}{details.totalFiat}</p>
    </Grid>
  </Grid>
)

export default Summary;