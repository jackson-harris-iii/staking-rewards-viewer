import React, { Fragment } from 'react'
import {Grid} from '@material-ui/core';
import Image from 'next/image'
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';

const Header = ({lang, currency, theme}) => (
  <Grid container xs={12}>
    <Grid xs={3} item align="center" justify="center" direction="row" >
      <Image
        src="/Polkadot-logo-light.png"
        alt="Polkadot Logo"
        width={150}
        height={75}
      />
    </Grid>

    <Grid item xs={6} alignItems="center" justify="center">
      <h1 style={{fontFamily:'work sans black', color: "black", textAlign: "center"}}>Staking Rewards Viewer</h1>
    </Grid>

    <Grid xs={3} container alignments="center" justify="center" direction="row" spacing={3} style={{marginTop: "1em"}} >
      <Grid item style={{marginTop: ".5em"}}>
        <h4 style={{marginRight: "1em", display: "inline", fontFamily: "Work Sans"}}>EN</h4>
        <h4 style={{display: "inline", fontFamily: "Work Sans light"}}>$USD</h4>
      </Grid>

      <Grid item>
      </Grid>

      <Grid item alignments="center" style={{marginTop: ".25em"}}>
        <GitHubIcon
          style={{color: `${theme.pink}`, marginRight: ".5em"}}
        />
        <TwitterIcon
          style={{color: `${theme.pink}`}}
        />
      </Grid>
    </Grid>

  </Grid>
)

export default Header;