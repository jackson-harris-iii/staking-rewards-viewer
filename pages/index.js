import React, { Fragment, useState, useEffect } from 'react';
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
// import Chart from 'chart.js/auto';

const fetcher = (url, info) => Collector(info).then(data => data)

const HomePage = ({props}) => {


  const theme = useTheme();
  // const [address, setAddress ] = useState();
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());
  // const [balance, setBalance ] = useState();
  // const [priceData, setPriceData ] = useState("true");
  const [exportOutput, setExportOutput ] = useState("true");
  const [toggleExport, setToggleExport] = useState(true)
  const [submission, setSubmission] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [rewards, setRewards] = useState();
  const [currency, setCurrency] = useState(['$', 'USD']);
  const [urls, setUrls] = useState();
  const [isOpen, setIsOpen] = useState(false);

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
      setIsOpen(true)


    }
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  // const handleAddressChange = (e) => {
  //   e.preventDefault();
  //   setAddress(e.target.value);
  // }

  // const handleStartBalance = (e) => {
  //   e.preventDefault();
  //   setBalance(e.target.value);
  // }

  // const handleSubmission = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true)
  //   let addressesData, balances
  //   if (address) {
  //     addressesData = address.split(",");
  //   } else {
  //     alert("please enter valid address")
  //   }
  //   if (balance) {
  //     balances = balance.trim().split(",");
  //   } else {
  //     alert("please enter valid balances")
  //   }
  //   let start = moment(startDate).format("YYYY-MM-DD");
  //   let end = moment(endDate).format("YYYY-MM-DD");

  //   const addresses = addressesData.map((address, index) => {
  //     return {
  //       name: `Account ${index + 1}`,
  //       address: address.trim(),
  //       startBalance: parseInt(`${balances[index]}`)
  //     }
  //   })

  //   let payload = {
  //     start, end, currency: currency[1], priceData, exportOutput, addresses
  //   };

  //   setSubmission(payload);

  // }

  const body = (
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
    <Modal
    open={isOpen}
    onClose={handleClose}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
    {body}
  </Modal>
  </>
  )
};

export default HomePage;