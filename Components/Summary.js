import React from 'react'

const Summary = ({details, currency}) => (
  <div>
    {console.log(details)}
    <h2 style={{fontFamily: "Work Sans light"}}>Summary</h2>
    <p style={{fontFamily: "Work Sans"}}>In total, {details.numberPayouts.DOT} DOT and {details.numberPayouts.KSM} KSM payouts were found.</p>
    <p style={{fontFamily: "Work Sans"}}>The sum of staking rewards are {details.totalStaked.DOT} and {details.totalStaked.KSM}, which sums up to a total of {currency}{details.totalFiat}</p>
  </div>
)

export default Summary;