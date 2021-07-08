//import Chart from 'chart.js/auto';
import React, { Fragment, useState, useEffect }  from 'react';
import { Line } from 'react-chartjs-2';
import useSWR, { mutate } from 'swr'
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import { Container, Input, Grid, Paper, Switch, CircularProgress, Modal } from '@material-ui/core';


  const DotChart = ({input_data}) => {
    // Inital outline of data to update for graph.
    const [DisplayData, setDisplayData] = useState({
      labels: ['1', '2', '3', '4', '5', '6'],
      datasets: [
        {
          label: 'Dot Price',
          data: [12, 19, 3, 5, 2, 3],
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          radius: 0.5,
          tension: 0.3,
          borderColor: 'rgba(255, 99, 132, 0.9)',
          yAxisID: 'y-axis-1',
        },
      ],
    });

    // Time stamp at click
    const [timeStamp, setTimeStamp] = useState(Date.now());

    // boolean of if data is retrieved from api
    const [hasGraphDataMinute, setHasGraphDataMinute] = useState(false);
    const [hasGraphDataHourly, setHasGraphDataHourly] = useState(false);
    const [hasGraphDataDaily, setHasGraphDataDaily] = useState(false);
    const [hasGraphDataMax, setHasGraphDataMax] = useState(false);

    // Inital Graph setup and display
    const [InitialDataToShow, setInitialDataToShow] = useState(null);
    const [doModifyInitialData, setDoModifyInitialData] = useState(true);

    // Actual Data returned from gecko api
    const [geckoReturnedMinuteData, setGeckoReturnedMinuteData] = useState(null);
    const [geckoReturnedHourData, setGeckoReturnedHourData] = useState(null);
    const [geckoReturnedDayData, setGeckoReturnedDayData] = useState(null);
    const [geckoReturnedMaxData, setGeckoReturnedMaxData] = useState(null);

    // Click handler to tell which data to load and display.
    const [doModifyMinuteData, setDoModifyMinuteData] = useState(false);
    const [doModifyHourData, setDoModifyHourData] = useState(false);
    const [doModifyDayData, setDoModifyDayData] = useState(false);
    const [doModifyMaxData, setDoModifyMaxData] = useState(false);

    // String containing which time range to display on graph. set my click.
    const [timeString, setTimeString] = useState(null);
    const [currency, setCurrency] = useState('USD')
    
    
    if (input_data[1] != currency)
    {
      // Update data by currency
      // Default to past 30 days.
      setCurrency(input_data[1])
      
      let temp = {...DisplayData};
      temp.datasets[0].label = `Dot Price (${input_data[1]})`;
      setDisplayData(temp);

      setHasGraphDataMinute(false);
      setHasGraphDataHourly(false);
      setHasGraphDataDaily(false);
      setHasGraphDataMax(false);

      setTimeString("1M");
      setDoModifyHourData(true);
    } 


    /* ================================================================== */
    // Inital setup of data for the graph.
    // Other displays follow simliar procedure:
    // fetcher -> check for data -> format and display.
    /* ================================================================== */

    /* Initial fetch to get data */
    let graphFetcher = (url) => fetch(url).then(response => response.json() ).then( graphData => {setGeckoReturnedHourData(graphData);setInitialDataToShow(graphData);setHasGraphDataHourly(true);})
    const { graphData, graphDataError } = useSWR( !hasGraphDataHourly ? `https://api.coingecko.com/api/v3/coins/polkadot/market_chart?vs_currency=${currency}&days=30`: null, graphFetcher);
    if (graphDataError) return "An error has occurred"

    /* Initial call to update graph once data is recieved */
    InitialDataToShow && doModifyInitialData ? modifyInitialData() : {}

    /* Initial function to format and set data */
    function modifyInitialData() {
      /* Hourly data of 30 days */
      var times = [];
      var prices = [];
      let dateHuman = new Intl.DateTimeFormat('en-US', { hour: '2-digit', day: '2-digit' });

      // Handle Data
      InitialDataToShow.prices.forEach(function(touple) {
        times.push(dateHuman.format(touple[0]))
        prices.push(touple[1])
      })

      // Setup data
      let temp = {...DisplayData}
      temp.labels = times
      temp.datasets[0].data = prices
      temp.datasets[0].label = `Dot Price (${currency})`;
      setDisplayData(temp)
      setDoModifyInitialData(false);
    }

    /* ================================================================== */
    // Calls to the update display, from the render once data is recieved
    /* ================================================================== */
    doModifyMinuteData && hasGraphDataMinute ? updateDisplayChartData({ minute: "2-digit", hour: "2-digit" }, setDoModifyMinuteData) : {}
    doModifyHourData && hasGraphDataHourly ? updateDisplayChartData( { hour: '2-digit', day: '2-digit' } , setDoModifyHourData) : {}
    doModifyDayData && hasGraphDataDaily ? updateDisplayChartData( { day: '2-digit', month: '2-digit' } , setDoModifyDayData) : {}
    doModifyMaxData && hasGraphDataMax ? updateDisplayChartData( { day: '2-digit', month: '2-digit' } , setDoModifyMaxData) : {}



    /* ================================================================== */
    // Calls to fetch data as user clicks different buttons.
    // This does not happen all at once.
    /* ================================================================== */
    /* Minute data of 24 hours */
    const graphFetcher2 = (url) => fetch(url).then(response => response.json() ).then( graphData => {setGeckoReturnedMinuteData(graphData);setHasGraphDataMinute(true)})
    const { graphData2, graphDataError2 } = useSWR( doModifyMinuteData && !hasGraphDataMinute ? `https://api.coingecko.com/api/v3/coins/polkadot/market_chart?vs_currency=${currency}&days=1`: null, graphFetcher2);
    if (graphDataError2) return "An error has occurred"

    /* hourly data of 1 month */
    const graphFetcher3 = (url) => fetch(url).then(response => response.json() ).then( graphData => {setGeckoReturnedHourData(graphData);setHasGraphDataHourly(true)})
    const { graphData3, graphDataError3 } = useSWR( doModifyHourData && !hasGraphDataHourly ? `https://api.coingecko.com/api/v3/coins/polkadot/market_chart?vs_currency=${currency}&days=30`: null, graphFetcher3);
    if (graphDataError3) return "An error has occurred"

    // /* Daily data of 1 year */
    const graphFetcher4 = (url) => fetch(url).then(response => response.json() ).then( graphData => { setGeckoReturnedDayData(graphData); setHasGraphDataDaily(true)})
    const { graphData4, graphDataError4 } = useSWR( doModifyDayData && !hasGraphDataDaily ? `https://api.coingecko.com/api/v3/coins/polkadot/market_chart?vs_currency=${currency}&days=365`: null, graphFetcher4);
    if (graphDataError4) return "An error has occurred"

    // /* Daily data of 1 year */
    const graphFetcher5 = (url) => fetch(url).then(response => response.json() ).then( graphData => {setGeckoReturnedMaxData(graphData);setHasGraphDataMax(true)})
    const { graphData5, graphDataError5 } = useSWR( doModifyMaxData && !hasGraphDataMax ? `https://api.coingecko.com/api/v3/coins/polkadot/market_chart?vs_currency=${currency}&days=max`: null, graphFetcher5);
    if (graphDataError5) return "An error has occurred"


    /* ================================================================== */
    // Main Format and Update display with data recieved after click.
    /* ================================================================== */
    function updateDisplayChartData(formatTime, stateSetter){
      var times = [];
      var prices = [];
      let dateHuman = new Intl.DateTimeFormat('en-US', {...formatTime})
      let GD = null;

      var time = timeString;
      if (time === "1H"){        /* 1h */  GD = geckoReturnedMinuteData.prices.filter( (x) => x[0] > timeStamp - 3600000 )}
      else if (time === "24H"){  /* 24H */ GD = geckoReturnedMinuteData.prices}
      else if (time === "1W"){   /* 1W */  GD = geckoReturnedHourData.prices.filter( (x) => x[0] > (timeStamp.toFixed() - 604800000) )}
      else if (time === "1M"){   /* 1M */  GD = geckoReturnedHourData.prices}
      else if (time === "1Y"){   /* 1Y */  GD = geckoReturnedDayData.prices}
      else if (time === "MAX"){  /* ALL */ GD = geckoReturnedMaxData.prices}

      // Handle Data
      GD.forEach(function(touple) {
        times.push(dateHuman.format(touple[0]));
        prices.push(touple[1]);
      })

      // Setup data
      let temp = {...DisplayData};
      temp.labels = times;
      temp.datasets[0].data = prices;
      setDisplayData(temp);
      stateSetter(false);
    }


    /* ================================================================== */
    // Handle client clicks.
    /* ================================================================== */
    const handleTimeClick = async (time) => {

      /* Must set before if else call */
      setTimeString(time);

      // Get TimeStamp at click event.
      setTimeStamp(Date.now())

      if (time === "1H"){       /* 1h */  setDoModifyMinuteData(true);}
      else if (time === "24H"){ /* 24H */ setDoModifyMinuteData(true);}
      else if (time === "1W"){  /* 1W */  setDoModifyHourData(true);}
      else if (time === "1M"){  /* 1M */  setDoModifyHourData(true);}
      else if (time === "1Y"){  /* 1Y */  setDoModifyDayData(true);}
      else if (time === "MAX"){ /* ALL */ setDoModifyMaxData(true);}
    }


    return hasGraphDataHourly ?
      <Grid container justify="center">
        <Line data={DisplayData} />
        {/* Minute data for hours */}
        <Button color="primary" onClick={() => handleTimeClick("1H")}>
          1H
        </Button>
        <Button color="primary" onClick={() => handleTimeClick("24H")}>
          24H
        </Button>
        {/* Hourly Data for Days */}
        <Button color="primary" onClick={() => handleTimeClick("1W")}>
          1W
        </Button>
        <Button color="primary" onClick={() => handleTimeClick("1M")}>
          1M
        </Button>
        {/* Daily Data for Years */}
        <Button color="primary" onClick={() => handleTimeClick("1Y")}>
          1Y
        </Button>
        {/* Daily Data for All time */}
        <Button color="primary" onClick={() => handleTimeClick("MAX")}>
          MAX
        </Button>
      </Grid> : <>
      {/* Put skeleton here while loading data for graph. */}
      <Skeleton animation="wave" variant="rect" width="100%" height="25vh"/>
      <br/>
      <Skeleton animation="wave" variant="rect" style={{marginBottom: '2em'}}/>
      </>
  };

  export default DotChart;