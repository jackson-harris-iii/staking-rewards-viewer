import React from 'react'

const Summary = ({details, currency}) => (
  <div>
    {console.log(details)}
    <h2>Summary</h2>
    <p>In total, {details.numberPayouts.DOT} DOT and {details.numberPayouts.KSM} KSM payouts were found.</p>
    <p>The sum of staking rewards are {details.totalStaked.DOT} and {details.totalStaked.KSM}, which sums up to a total of {currency}{details.totalFiat}</p>
  </div>
)

export default Summary;