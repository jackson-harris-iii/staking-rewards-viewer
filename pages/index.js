import React, { Fragment, useState} from 'react';
import useSWR, { mutate } from 'swr'
import { useTheme } from '@material-ui/core/styles';
import { Container, Input, Grid, Paper, Modal, Tooltip, Fade } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import Collector from '../Utils'
import { downloadCSV } from '../Utils/fileWorker'
import Header from '../Components/Header.js'
import FormContainer from '../Components/Form'
import DotChart from '../Components/DotChart.js'
import SummaryContainer from '../Components/SummaryContainer'
import DownloadModal from '../Components/DownloadModal'
import Footer from '../Components/Footer.js'

const HomePage = ({props}) => {


  const theme = useTheme();
  const [toggleExport, setToggleExport] = useState(true)
  const [submission, setSubmission] = useState();
  const [submit, setSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [rewards, setRewards] = useState();
  const [currency, setCurrency] = useState(['$', 'USD']);
  const [urls, setUrls] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [positionVal, setPositionVal] = useState('absolute');
  const [data, setData] = useState();

  const fetcher = (url, info) => Collector(info).then((data) => {responder(data); return data})

  const responder = (data) => {
    setIsLoading(false)
    setData(data);
    setSubmit(false)
    return data
  }

  const { info, error } = useSWR(submission && submit ? ['submisionKey', submission] : null, fetcher);
  if (error) {
    isLoading ? setIsLoading(false) : null;
  }

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
          <Header theme={theme} setCurrency={setCurrency}/>

          {/* --- Form & Chart Section --- */}
          <Fade in={true} timeout={600}>
            <Grid container justify="center" style={{marginTop: "5vh"}} spacing={5}>

                { /* Daily Dot Price Data*/}
                <Grid
                  item
                  md={6}
                  container
                  justify="center"
                >
                  <Container>
                    <Paper style={{width:'100%', paddingTop: '.2em'}} elevation={3}>
                      <Container>
                        <h3 style={{fontFamily: "Work Sans light"}}>Dot Daily Price Data</h3>

                        <DotChart input_data={currency}/>

                      </Container>
                    </Paper>
                  </Container>
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
                      <Grid container>

                        {/* Staking Form title */}
                        <Grid container item xs={4} alignItems="center">
                          <h3 style={{fontFamily: "Work Sans light", paddingTop: '1em', marginTop: 0}}>Get Staking Data</h3>

                          {/* Staking form Tooltip */}

                          <Tooltip style={{paddingLeft: '5px'}} TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={
                            <Grid item container style={{margin: '1em'}}>
                              <span style={{paddingRight: '5px', fontSize: "1.5em", fontFamily: "Work Sans light", fontWeight: 'bolder'}}>
                                Use this form to search for your DOT or KSM staking rewards over a given period of time by entering in a valid Wallet Address.
                                <br/>
                                <br/>
                                You may search for up to two addresses at a time for the same period.
                              </span>
                            </Grid>
                          }>
                            <InfoIcon fontSize="small"/>
                          </Tooltip>
                        </Grid>
                      </Grid>

                      {/* Staking form component */}
                      <FormContainer
                        submission={submission}
                        setSubmission={setSubmission}
                        setIsLoading={setIsLoading}
                        setSubmit={setSubmit}
                        currency={currency}
                      />
                    </Container>
                  </Paper>
                </Grid>

            </Grid>
          </Fade>
          {/* --- Summary Display Section --- */}
          <SummaryContainer setToggleExport={setToggleExport} toggleExport={toggleExport} data={data} handleExport={handleExport} currency={currency} isLoading={isLoading} theme={theme}/>

          {
            error ? <Container><h3 style={{marginTop: '3em'}}>No Results Found</h3></Container> : null
          }

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