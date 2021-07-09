import React, { Fragment, useState} from 'react';
import useSWR, { mutate } from 'swr'
import { useTheme } from '@material-ui/core/styles';
import { Container, Input, Grid, Paper, Modal } from '@material-ui/core';
import Collector from '../Utils'
import { downloadCSV } from '../Utils/fileWorker'
import Header from '../Components/Header.js'
import FormContainer from '../Components/Form'
import DotChart from '../Components/DotChart.js'
import SummaryContainer from '../Components/SummaryContainer'
import DownloadModal from '../Components/DownloadModal'
import DotChart from '../Components/DotChart.js'
import Footer from '../Components/Footer.js'

const fetcher = (url, info) => Collector(info).then(data => data)

const HomePage = ({props}) => {


  const theme = useTheme();
  const [toggleExport, setToggleExport] = useState(true)
  const [submission, setSubmission] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [rewards, setRewards] = useState();
  const [currency, setCurrency] = useState(['$', 'USD']);
  const [urls, setUrls] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [curtest, setcurtest] = useState(['$','USD']);
  const [positionVal, setPositionVal] = useState('absolute');


  const { data, error } = useSWR(submission ? ['submisionKey', submission] : null, fetcher);
  if (error) return "An error has occurred"

  const handleExport = async () => {
  // this checks to see if our toggle is set to true for csv or false for json if json open new tab with json data
    if (!toggleExport) {
      let jsonView = window.open()
      jsonView.document.open()
      jsonView.document.write(JSON.stringify(data))
      jsonView.document.close()
      jsonView.focus();
    } else {
      let copy = [...data]
      copy.pop()
      const urlsPromise = await downloadCSV(copy);
      const urls = await Promise.all(urlsPromise);
      await setUrls(urls)
      setModalOpen(true)
    }
  }

  return(
    <>
    <Grid container style={{height: "100vh"}}>
      <Grid item container style={{marginBottom: '3em'}}>
        <Container>
          <Header theme={theme} />

          {/* --- Form & Chart Section --- */}

          <Grid container justify="center" style={{marginTop: "5vh"}} spacing={5}>

              { /* Daily Dot Price Data*/}
              <Grid
                item
                md={6}
                container
                justify="center"
                fluid
              >
                <Paper style={{width:'100%'}} elevation={3} >
                  <Container>
                    <h3 style={{fontFamily: "Work Sans light"}}>Dot Daily Price Data</h3>

                    <DotChart input_data={curtest}/>

                  </Container>
                </Paper>
              </Grid>

              {/* Staking info entry form*/}
              <Grid
                item
                container
                justify="center"
                md={6}
              >
                {/* Import Form Component to capture user data */}
                <Paper style={{width:'100%', height:'100%'}} elevation={3} >
                  <Container>
                    <h3 style={{fontFamily: "Work Sans light", paddingTop: '1em', marginTop: 0}}>Get Staking Data</h3>

                    <FormContainer
                      submission={submission}
                      setSubmission={setSubmission}
                      setIsLoading={setIsLoading}
                      currency={currency}
                    />
                  </Container>
                </Paper>
              </Grid>

          </Grid>

          {/* --- Summary Display Section --- */}

          <SummaryContainer setToggleExport={setToggleExport} toggleExport={toggleExport} data={data} handleExport={handleExport} currency={currency} isLoading={isLoading} theme={theme}/>
        </Container>
      </Grid>

      <Grid item container alignContent="flex-end">
        <Footer positionVal={positionVal}/>
      </Grid>
      </Grid>
      <DownloadModal urls={urls} theme={theme} setModalOpen={setModalOpen} modalOpen={modalOpen}/>
    </>
  )
};

export default HomePage;