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
    <Grid xs={6} item container spacing={1} style={{marginTop: "1em"}} justify="flex-end">
      {/* Currency Select & language select*/}
      <Grid item container xs={3}>
        <div>
          <Button style={{fontFamily: "Work Sans"}}>EN</Button>
        </div>
        <CurrencyPicker setCurrency={setCurrency}/>
      </Grid>

      {/* Github & Twitter Links*/}
      <Grid item alignments="center" style={{marginTop: ".25em"}} xs={3}>
        <Link href="https://github.com/jackson-harris-iii/staking-rewards-viewer">
          <a target="_blank">
            <GitHubIcon
              style={{color: `${theme.pink}`, marginRight: ".5em"}}
            />
          </a>
        </Link>
        <TwitterIcon
          style={{color: `${theme.pink}`}}
        />
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <h1 style={{fontFamily:'work sans black', color: "black", textAlign: "center", fontSize: "3em"}}>Staking Rewards Viewer</h1>
    </Grid>

  </Grid>
  </>
)

export default Header;