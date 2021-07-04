import React, { Fragment } from 'react'
import {AppBar, Toolbar, IconButton, MenuIcon, Grid} from '@material-ui/core';
import Image from 'next/image'
import Link from 'next/link'
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';

const Header = ({lang, currency, theme}) => (
  <>
  {/* <AppBar position="static">
    <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
  </AppBar> */}

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
    <Grid xs={6} item container spacing={3} style={{marginTop: "1em"}} justify="flex-end">
      {/* Currency Select */}
      <Grid item style={{marginTop: ".5em"}}>
        <h4 style={{marginRight: "1em", display: "inline", fontFamily: "Work Sans"}}>EN</h4>
        <h4 style={{display: "inline", fontFamily: "Work Sans light"}}>$USD</h4>
      </Grid>

      <Grid item>
      </Grid>

      <Grid item alignments="center" style={{marginTop: ".25em"}}>
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