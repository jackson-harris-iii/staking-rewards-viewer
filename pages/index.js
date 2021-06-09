import React, { Fragment, useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr'
import Image from 'next/image'
import { useTheme } from '@material-ui/core/styles';
import { Container, Input, Grid, Paper, Switch, CircularProgress } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import moment from 'moment'
import Button from '@material-ui/core/Button';
import dummyData from '../dummyData.json'
import Summary from '../Components/Summary.js'
import DetailsTable from '../Components/DetailsTable.js'
import Header from '../Components/Header.js'
import Collector from '../Utils'
// import Chart from 'chart.js/auto';

const fetcher = (url, info) => Collector(info).then(data => data)

const HomePage = ({props}) => {


  const theme = useTheme();
  const [address, setAddress ] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [balance, setBalance ] = useState();
  const [priceData, setPriceData ] = useState("true");
  const [exportOutput, setExportOutput ] = useState("true");
  const [submission, setSubmission] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [rewards, setRewards] = useState();
  const [currency, setCurrency] = useState(['$', 'USD']);

  const { data, error } = useSWR(submission ? ['submisionKey', submission] : null, fetcher);

  if (error) return "An error has occurred"

  const handleCurrencyChange = (e) => {

  }

  //may not be needed
  const togglePriceData = (e) => {

  }

  const handleExport = () => {

  }

  const handleAddressChange = (e) => {
    e.preventDefault();
    setAddress(e.target.value);
  }

  const handleStartBalance = (e) => {
    e.preventDefault();
    setBalance(e.target.value);
  }

  const handleSubmission = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    let addressesData, balances
    if (address) {
      addressesData = address.split(",");
    } else {
      alert("please enter valid address")
    }
    if (balance) {
      balances = balance.trim().split(",");
    } else {
      alert("please enter valid balances")
    }
    let start = moment(startDate).format("YYYY-MM-DD");
    let end = moment(endDate).format("YYYY-MM-DD");

    const addresses = addressesData.map((address, index) => {
      return {
        name: `Account ${index + 1}`,
        address: address.trim(),
        startBalance: parseInt(`${balances[index]}`)
      }
    })

    let payload = {
      start, end, currency: currency[1], priceData, exportOutput, addresses
    };

    console.log(payload);
    setSubmission(payload);

    // try {
    //   console.log(submission)
    //   const stakeData = await mutate('/api/collector', payload);
    //   setRewards(stakeData);
    // } catch (error) {
    //   console.log(error)
    // }
  }

  // const config = {
  //   type: 'line',
  //   data,
  //   options: {}
  // };

  // const labels = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  // ];
  // const chartData = {
  //   labels: labels,
  //   datasets: [{
  //     label: 'My First dataset',
  //     backgroundColor: 'rgb(255, 99, 132)',
  //     borderColor: 'rgb(255, 99, 132)',
  //     chartData: [0, 10, 5, 2, 20, 30, 45],
  //   }]
  // };


  return(

    <Container fluid>

      <Header theme={theme} />

    <Grid container justify="center" style={{marginTop: "5em"}} spacing={4}>
        <Grid
          item
          sm={5}
        >
          <form style={{marginTop: "5em"}}>
            <Grid container>
              <Grid item xs={12}>
                <Input fullWidth={true} onChange={(e) => handleAddressChange(e)} placeholder="search by wallet address(s)"></Input>
              </Grid>
            </Grid>
            <br/>
            <br/>
            <Grid container>
            <Grid item xs={6}>
              <label style={{marginRight: ".5em"}}>StartDate: </label>
              <DatePicker value={moment(startDate).format("YYYY-MM-DD")} onChange={date => setStartDate(date)} />
            </Grid>
            <Grid item xs={6}>
              <label style={{marginRight: ".5em"}}>EndDate: </label>
              <DatePicker value={moment(endDate).format("YYYY-MM-DD")} onChange={date => setEndDate(date)} />
            </Grid>
            </Grid>
            <br/>
            <br/>
            <Input fullWidth={true} onChange={(e) => handleStartBalance(e)} placeholder="start balance(s)"></Input>
            <br/>
            <br/>
            <Button
              style={{backgroundColor:`${theme.pink}`, color: "white"}}
              onClick={handleSubmission}
            >
              Search
            </Button>
          </form>
        </Grid>

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

        <div>
        {
          // data ? <div> `${JSON.stringify(data)}` </div> : null
          data ?
            <Paper elevation={3} style={{marginTop: "3em", paddingBottom: '1em'}}>
              <Summary currency={currency[0]} details={data[data.length - 1].details}/>
              <DetailsTable details={data} currency={currency}/>
              <Grid container alignItems="center" style={{marginLeft: '1em'}} spacing={2}>
                <Grid item xs={1}>
                  <Button
                  style={{backgroundColor:`${theme.pink}`, color: "white", marginTop: '1em'}}
                  onClick={handleSubmission}
                >
                  Export
                </Button>
              </Grid>
              <Grid item container alignItems="center"xs={4}>
                <p style={{display: 'inline', marginBottom: '0', fontFamily: "Work Sans light"}}>CSV</p>
                <div style={{marginTop: '.75em'}}>
                  <Switch inputProps={{ 'aria-label': 'primary checkbox' }} />
                </div>
                <p style={{display: 'inline', marginBottom: '0', fontFamily: "Work Sans light"}}>JSON</p>
              </Grid>
            </Grid>
            </Paper>
            : <> {
              isLoading ? <Grid container style={{marginTop: '3em'}} justify="center"><CircularProgress /></Grid> : null
            } </>
        }
        </div>

    </Container>
  )
};

export default HomePage;