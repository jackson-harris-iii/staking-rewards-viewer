import React, { Fragment } from 'react'
import {AppBar, Toolbar, IconButton, MenuIcon, Grid, Button} from '@material-ui/core';
import Image from 'next/image'
import Link from 'next/link'
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import CurrencyPicker from './CurrencyPicker.js'

const Header = ({lang, currency, theme, setCurrency}) => (
  <>
    <Grid container justify="space-between">
    {/* Polkadot logo */}
    <Grid xs={3} item>
      <Link href="https://polkadot.network/">
        <a target="_blank">
          <Image
            src="/Polkadot-logo-light.png"
            alt="Polkadot Logo"
            width={150}
            height={75}
          />
        </a>
      </Link>
    </Grid>

    {/* Nav Options */}
    <Grid item container xs={8} sm={6} spacing={1} style={{marginTop: "1em"}} justify="flex-end">
      {/* Currency Select & language select*/}
      <Grid item container xs={6} md={3} justify="space-around">
        <Grid item container xs={6}>
          <div>
            <Button style={{fontFamily: "Work Sans"}}>EN</Button>
          </div>
        </Grid>
        {/* Currency Picker  */}
        <Grid item container xs={6}>
          <CurrencyPicker setCurrency={setCurrency}/>
        </Grid>
      </Grid>

      {/* Github & Twitter Links*/}
      <Grid item container alignments="center" style={{marginTop: ".25em"}} xs={3}>
        <Link href="https://github.com/jackson-harris-iii/staking-rewards-viewer">
          <a target="_blank">
            <GitHubIcon
              style={{color: `${theme.pink}`, marginRight: ".5em"}}
            />
          </a>
        </Link>
        {/* <Link href="https://twitter.com/web3foundation">
          <a target="_blank">
            <TwitterIcon
              style={{color: `${theme.pink}`}}
            />
          </a>
        </Link> */}
      </Grid>
    </Grid>

    {/* Header Title */}
    <Grid item xs={12}>
      <h1 style={{fontFamily:'work sans black', color: "black", textAlign: "center", fontSize: "3em"}}>Staking Rewards Viewer</h1>
    </Grid>

  </Grid>
  </>
)

export default Header;