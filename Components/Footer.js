import React, { Fragment } from 'react'
import {AppBar, Toolbar, IconButton, MenuIcon, Grid} from '@material-ui/core';
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from '@material-ui/core/styles';

const Footer = () => {
  const theme = useTheme();
  return(
    <Grid container style={{backgroundColor:"black", width: '100vw', paddingTop: '.25em', position: 'relative', bottom: 0}} justify="center">
        <Grid item>
          <Link href='https://web3.foundation/grants/'>
            <a target="_blank">
              <Image
                src="/web3_foundation_grants_badge_white.png"
                alt="web 3 foundation badge"
                width={187.5}
                height={75}
              />
            </a>
          </Link>
        </Grid>
    </Grid>
  )
}

export default Footer