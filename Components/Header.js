import React, { Fragment } from 'react'
import {AppBar, Toolbar, IconButton, MenuIcon, Grid} from '@material-ui/core';
import Image from 'next/image'
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import CurrencyMenu from '../Components/CurrencyPicker.js';


const Header = ({lang, setCurrency, theme}) => (
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

  <Grid container>
    <Grid xs={3} item>
      <Image
        src="/Polkadot-logo-light.png"
        alt="Polkadot Logo"
        width={150}
        height={75}
      />
    </Grid>

    <Grid item xs={6}>
      <h1 style={{fontFamily:'work sans black', color: "black", textAlign: "center"}}>Staking Rewards Viewer</h1>
    </Grid>

    <Grid xs={3} container spacing={3} style={{marginTop: "1em"}} >
      <Grid item style={{marginTop: ".5em"}}>
        <h4 style={{marginRight: "1em", display: "inline", fontFamily: "Work Sans"}}>EN</h4>
      </Grid>
      
      <Grid item alignments="center">
        <CurrencyMenu call_back={setCurrency}/>
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
  </>
)

export default Header;