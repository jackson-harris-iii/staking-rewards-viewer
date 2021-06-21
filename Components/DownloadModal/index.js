import React, {useState} from 'react';
import Link from 'next/link';
import { Paper, Grid, Button, Modal } from '@material-ui/core';

const DownloadModal = ({urls, modalOpen, setModalOpen, theme}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setModalOpen(false)
  }

  const ModalBody = (
    <Paper
      elevation={3}
      style={{position: 'absolute',
      width: 400,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      paddingTop: "4em",
      paddingBottom: "5em",
      paddingRight: "1em",
      paddingLeft: "1em",
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -50%)`
      }}
    >
      <Grid container justify="center">
        <Grid item container justify="center" xs={12}>
          <h3 style={{fontFamily: "Work Sans light", marginTop: 0}}>Your Downloads</h3>
        </Grid>

        {urls ? urls.map((url, index) => {
        return(
          <Grid item container justify="center" xs={6}>
            <Link target="_blank" href={`${url}`} passHref>
            <Button style={{backgroundColor:`${theme.pink}`, color: "white", marginTop: '1em'}}>Address{index + 1}.csv</Button>
            </Link>
          </Grid>
        )
        }): null}

      </Grid>
    </Paper>
  )

  return(
    <>
      <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      >
        {ModalBody}
      </Modal>
    </>
  )
}

export default DownloadModal