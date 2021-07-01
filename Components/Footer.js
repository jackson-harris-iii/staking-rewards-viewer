import React, { Fragment } from 'react'
import {AppBar, Toolbar, IconButton, MenuIcon, Grid} from '@material-ui/core';
import Link from 'next/link'
import { useTheme } from '@material-ui/core/styles';

const Footer = () => {
  const theme = useTheme();
  return(
    <Grid container style={{backgroundColor:"black", width: '100vw', padding: '2em', position: 'fixed', bottom: 0, marginTop: '3em'}} justify="center">
        <Grid item>
          <h4 style={{color: 'white'}}>a <Link href='https://web3.foundation/grants/' target="_blank"><a target="_blank" style={{color: `${theme.pink}`, textDecoration: 'none'}}>web3 foundation</a></Link> open source contribution</h4>
        </Grid>
    </Grid>
  )
}

export default Footer