import React, { Fragment } from 'react'
import {AppBar, Toolbar, IconButton, MenuIcon, Grid} from '@material-ui/core';

const Footer = () => {
  return(
    <Grid container style={{backgroundColor:"black", width: '100vw', padding: '2em', bottom: 0, position: 'absolute'}} justify="center">
        <Grid item>
          <h4 style={{color: 'white'}}>a W3F open source contribution</h4>
        </Grid>
    </Grid>
  )
}

export default Footer