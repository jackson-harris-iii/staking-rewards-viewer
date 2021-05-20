import React, { Fragment, useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr'
import { useTheme } from '@material-ui/core/styles';
import {Container} from '@material-ui/core';
import DatePicker from 'react-datepicker';
import moment from 'moment'
import Button from '@material-ui/core/Button';
import dummyData from '../dummyData.json'
import Summary from '../Components/Summary.js'

const fetcher = (url, info) => fetch(url,
  {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(info)
  })
  .then(res => res.json());

const HomePage = ({props}) => {


  const theme = useTheme();
  // const [data, setData] = useState();
  const [address, setAddress ] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [balance, setBalance ] = useState();
  const [priceData, setPriceData ] = useState("true");
  const [exportOutput, setExportOutput ] = useState("true");
  const [submission, setSubmission] = useState();
  const [rewards, setRewards] = useState();
  const [currency, setCurrency] = useState(['$', 'USD']);

  const { data, error } = useSWR(submission ? ['/api/collector', submission] : null, fetcher);

  if (error) return "An error has occurred"

  const handleCurrencyChange = (e) => {

  }

  //may not be needed
  const togglePriceData = (e) => {

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
    console.log('hello')
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
    console.log(dummyData);


    setSubmission(payload);

    // try {
    //   console.log(submission)
    //   const stakeData = await mutate('/api/collector', payload);
    //   setRewards(stakeData);
    // } catch (error) {
    //   console.log(error)
    // }
  }



  return(
    <Container>

        <h1 style={{color:`${theme.pink}`}}>Hola Mundo</h1>
        <form>
          <input onChange={(e) => handleAddressChange(e)} placeholder="search by wallet address(s)"></input>
          <br/>
          <br/>
          <DatePicker value={startDate} onChange={date => setStartDate(date)} />
          <DatePicker value={endDate} onChange={date => setEndDate(date)} />
          <br/>
          <br/>
          <input onChange={(e) => handleStartBalance(e)} placeholder="start balance(s)"></input>
          <br/>
          <br/>
          <Button
            style={{backgroundColor:`${theme.pink}`}}
            onClick={handleSubmission}
          >
            Search
          </Button>
        </form>
        <div>
        {
          // data ? <div> `${JSON.stringify(data)}` </div> : null
          data ? <div> <Summary currency={currency[0]} details={data[data.length - 1].details}/></div> : null
        }
        </div>

    </Container>
  )
};

export default HomePage;