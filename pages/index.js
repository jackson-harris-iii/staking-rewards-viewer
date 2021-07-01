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
      <Container fluid styles={{...theme.root}}>

        <Header theme={theme} />

        {/* --- Form & Chart Section --- */}

        <Grid container justify="center" style={{marginTop: "5em"}} spacing={4}>

            {/* Staking info entry form*/}
            <Grid
              item
              md={5}
            >
              {/* Import Form Component to capture user data */}
              <FormContainer
                submission={submission}
                setSubmission={setSubmission}
                setIsLoading={setIsLoading}
                currency={currency}
              />
            </Grid>

            { /* Daily Dot Price Data*/}
            <Grid
              item
              md={5}
              container
              justify="center"
            >
              <Paper elevation={3}>
                <Container style={{paddingTop: ".15em", paddingBottom: ".5em"}}>
                  <h3 style={{fontFamily: "Work Sans light"}}>Dot Daily Price Data</h3>

                  <DotChart input_data={'USD'}/>

                </Container>
              </Paper>
            </Grid>

        </Grid>

        {/* --- Summary Display Section --- */}

        <SummaryContainer data={data} handleExport={handleExport} currency={currency} isLoading={isLoading} theme={theme}/>
      </Container>
      <Footer />
      <DownloadModal urls={urls} theme={theme} setModalOpen={setModalOpen} modalOpen={modalOpen}/>
    </>
  )
};

export default HomePage;