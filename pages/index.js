import React, { Fragment, useState} from 'react';
import useSWR, { mutate } from 'swr'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from '@material-ui/core/styles';
import { Container, Input, Grid, Paper, Switch, CircularProgress, Modal } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import moment from 'moment'
import Button from '@material-ui/core/Button';
import dummyData from '../dummyData.json'
import Summary from '../Components/Summary.js'
import DetailsTable from '../Components/DetailsTable.js'
import Header from '../Components/Header.js'
import Collector from '../Utils'
import { downloadCSV } from '../Utils/fileWorker'
import DayDetails from '../Components/DayDetails.js'
import FormContainer from '../Components/Form'
import DownloadModal from '../Components/DownloadModal'
// import Chart from 'chart.js/auto';

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
              <Image
                src="/price-chart.png"
                width={839}
                height={500}
              />
            </Container>
          </Paper>
        </Grid>

      </Grid>

      <Grid>

      </Grid>

      {/* Summary Display */}
        <div>
        {
          data ?
            <>
              {/* summary */}
              <Paper elevation={3} style={{marginTop: "3em", paddingBottom: '1em', padding: '1em'}}>
                <Summary currency={currency[0]} details={data[data.length - 1].details}/>
                <DetailsTable details={data} currency={currency}/>

                {/* export button and toggles */}
                <Grid container alignItems="center" style={{marginLeft: '1em'}} spacing={4}>
                  <Grid item container xs={1} justify="center">
                    <Button
                    style={{backgroundColor:`${theme.pink}`, color: "white", marginTop: '1em'}}
                    onClick={handleExport}
                  >
                      Export
                    </Button>
                  </Grid>
                  <Grid item container alignItems="center"xs={6}>
                    <p style={{display: 'inline', marginBottom: '0', fontFamily: "Work Sans light"}}>CSV</p>
                    <div style={{marginTop: '.75em'}}>
                      <Switch inputProps={{ 'aria-label': 'primary checkbox' }} onChange={() => setToggleExport(!toggleExport)}/>
                    </div>
                    <p style={{display: 'inline', marginBottom: '0', fontFamily: "Work Sans light"}}>JSON</p>
                  </Grid>
              </Grid>
              {/* {console.log('data 289', data.slice(0,-1))} */}
              </Paper>

              {/* daily data */}
              {
                // <DayDetails dayData={day}/>
                data[0].address ?
                data.map((item) => {
                  return item.data && item.data.list ?
                    <DayDetails dayData={item}/>
                    // item.data.list.map((day) => {
                    //   console.log('this is the day', day)
                    //  return <Paper elevation={3} style={{marginTop: "3em", paddingBottom: '1em', padding: '1em', overFlowY: 'auto'}}>
                    //    <span>${day.day}</span>
                    //     <DayDetails dayData={day}/>
                    //   </Paper>
                    // }): null
                    :null
                }) : null
              }

            </>
            : <> {
              isLoading ? <Grid container style={{marginTop: '3em'}} justify="center"><CircularProgress color="pink"/></Grid> : null
            } </>
        }
        </div>

    </Container>
    <DownloadModal urls={urls} theme={theme} setModalOpen={setModalOpen} modalOpen={modalOpen}/>
  </>
  )
};

export default HomePage;