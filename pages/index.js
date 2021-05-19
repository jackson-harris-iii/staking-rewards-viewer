import React, { Fragment, useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr'
import { useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DatePicker from "react-datepicker";
import Button from '@material-ui/core/Button';
import dummyData from '../dummyData.json'

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
  const [submission, setSubmission] = useState();
  const [rewards, setRewards] = useState();

  const { data, error } = useSWR(submission ? ['/api/collector', submission] : null, fetcher);

  if (error) return "AN error has occurred"


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

    await setSubmission(dummyData);

    try {
      console.log(submission)
      const stakeData = await mutate('/api/collector', submission);
      setRewards(stakeData);
    } catch (error) {
      console.log(error)
    }
  }



  return(
    <div>

        <h1 style={{color:`${theme.pink}`}}>Hola Mundo</h1>
        <form>
          <input onChange={(e) => handleAddressChange(e)} placeholder="search by wallet address(s)"></input>
          <br/>
          <br/>
          <DatePicker value={startDate} onChange={date => setStartDate(date)} />
          <DatePicker value={endDate} onChange={date => setStartDate(date)} />
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
          data ? <div> `${JSON.stringify(data)}` </div> : null
        }
        </div>

    </div>
  )
};

export default HomePage;