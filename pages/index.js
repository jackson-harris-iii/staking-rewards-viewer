import React, { Fragment, useState} from 'react';
import useSWR, { mutate } from 'swr'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from '@material-ui/core/styles';
import { Container, Input, Grid, Paper, Switch, CircularProgress, Modal } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import moment from 'moment'
import Button from '@material-ui/core/Button';
import Summary from '../Components/Summary.js'
import DetailsTable from '../Components/DetailsTable.js'
import Header from '../Components/Header.js'
import Collector from '../Utils'
import { downloadCSV } from '../Utils/fileWorker'
import DayDetails from '../Components/DayDetails.js'
import DotChart from '../Components/DotChart.js'
import FormContainer from '../Components/Form'
import DownloadModal from '../Components/DownloadModal'
import SummaryContainer from '../Components/SummaryContainer'

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

  const handleCurrencyChange = (e) => {

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
      console.log('these are the urls', urls)
      await setUrls(urls)
      setModalOpen(true)
    }
  }

  return(
    <>
    <Container fluid>

      <Header theme={theme} />

      {/* --- Form & Chart Section --- */}

      <Grid container justify="center" style={{marginTop: "5em"}} spacing={4}>

          {/* Staking info entry form*/}
          <Grid
            item
            sm={5}
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
            sm={5}
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

      {/* Summary Display */}

      <SummaryContainer data={data} handleExport={handleExport} currency={currency} isLoading={isLoading} theme={theme}/>

    </Container>
    <DownloadModal urls={urls} theme={theme} setModalOpen={setModalOpen} modalOpen={modalOpen}/>
  </>
  )
};

export default HomePage;