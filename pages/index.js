import React, { Fragment, useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr'
import { useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DatePicker from "react-datepicker";
import Button from '@material-ui/core/Button';
import dummyData from '../dummyData.json'

const fetcher = url => fetch(url).then(res => res.json());

const HomePage = ({props}) => {

  const { data, error } = useSWR('/api/collector', fetcher);

  if (error) return "AN error has occurred"



  const theme = useTheme();
  const [data, setData] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [submission, setSubmission] = useState();
  const [rewards, setRewards] = useState();

  useEffect( async () => {
    fetch9
  }, [submission])

  const handleAddressChange = () => {

  }

  const handleStartBalance = () => {

  }

  const handleSubmission = async (e) => {
    e.preventDefault();
    setSubmission(dummyData);

    mutate*
  }



  return(
    <div>

        <h1 style={{color:`${theme.pink}`}}>Hola Mundo</h1>
        <DatePicker value={startDate} onChange={date => setStartDate(date)} />
        <DatePicker value={endDate} onChange={date => setStartDate(date)} />
        <br/>
        <Button
          style={{backgroundColor:`${theme.pink}`}}
          onClick={handleSubmission}
        >
          Search
        </Button>

    </div>
  )
};

export async function getServerSideProps() {
  const res = await
}

export default HomePage;