import React, { Fragment, useState, useEffect } from 'react';
import { Container, Input, Grid, Paper, Switch, CircularProgress, Modal } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import DatePicker from 'react-datepicker';
import moment from 'moment'
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';

const FormContainer = ({submission, setSubmission, setSubmit, setIsLoading, currency}) => {
  const theme = useTheme();
  const [priceData, setPriceData ] = useState("true");
  const [exportOutput, setExportOutput ] = useState("true");
  const [address, setAddress ] = useState("");
  const [accountData, setAccountData] = useState({0:{}});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [balance, setBalance ] = useState("");

  //this set the maximum number of wallet addresses that can be looked up at once
  const maxFields = 3;

  const handleAddressChange = (e) => {
    e.preventDefault();
    let key = e.target.attributes.data.value
    let temp =  {...accountData}
    if (temp[key]) {
      temp[key].address = e.target.value
    }  else {
      temp[key] = {address : e.target.value}
    }
    temp[key] = {address : e.target.value}
    setAccountData(temp);
  }

  const handleStartBalance = (e) => {
    e.preventDefault();
    let key = e.target.attributes.data.value;
    let temp =  {...accountData};
    if (temp[key]) {
      temp[key].startBalance = parseInt(e.target.value)
    }  else {
      temp[key] = {startBalance : parseInt(e.target.value)}
    }
    setAccountData(temp);
  }

  const handleSubmission = async (e) => {
    e.preventDefault();
    let entries = 0;
    let lengths = 0;
    // let addresses = Object.entries(accountData).map((account, index) => {
    //   entries++
    //   lengths += 11
    //   return {name: `Account ${index + 1}`, ...account[1]}
    // })
    // console.log(accountData)
    setIsLoading(true);
    setSubmit(true);

    let start = moment(startDate).format("YYYY-MM-DD");
    let end = moment(endDate).format("YYYY-MM-DD");
    let addresses = Object.entries(accountData).map((account, index) => ({name: `Account ${index + 1}`, ...account[1]}))
    let payload = {
      start, end, currency: currency[1], priceData, exportOutput, addresses
    };
    setSubmission(payload);

  }

  const handleAddInputFields = (e) => {
    let len = Object.keys(accountData).length
    if (len < maxFields) {
      let temp =  {...accountData};
      let next = Object.keys(accountData).[Object.keys(accountData).length - 1]
      temp[parseInt(Object.keys(accountData).[Object.keys(accountData).length - 1]) + 1] = {};
      setAccountData(temp)
    }
  }

  const handleRemoveAddress = (e, val) => {
    let temp = {...accountData};
    delete temp[parseInt(val)]
    setAccountData(temp)
  }

  return(
    <>
      <form noValidate style={{paddingTop: "3em", paddingBottom: '.5em'}}>

      {/* Start / End Date */}

      <Grid container>
        <Grid item md={6}>
          <label style={{marginRight: ".5em"}}>StartDate: </label>
          <DatePicker value={moment(startDate).format("YYYY-MM-DD")} onChange={date => setStartDate(date)} />
        </Grid>
        <Grid item md={6}>
          <label style={{marginRight: ".5em"}}>EndDate: </label>
          <DatePicker value={moment(endDate).format("YYYY-MM-DD")} onChange={date => setEndDate(date)} />
        </Grid>
        </Grid>
        <br/>
        <br/>

        {/* Dynamic Form Fields */}

        <Grid container>
          <Grid item container alignItems="flex-end" xs={12}>
            <Grid item container alignItems="center" xs={1}
            >
              <AddCircleIcon onClick={handleAddInputFields} style={{color:`${theme.pink}`}}/>
            </Grid>
            {Object.keys(accountData).map((val, index) => {
              return (
              <Grid key={index} item container alignItems="flex-end" justify="flex-end" xs={12} style={{marginTop: ".5em"}}>
                {val > 0 ? <Grid item container xs={1} alignItems="flex-end" justify="flex-end"><CancelIcon fontSize="small" onClick={(e) => handleRemoveAddress(e, val)} /></Grid> : null}
                <Grid item container xs={12} spacing={1}>
                  <Grid item xs={9}>
                    <Input inputProps={{data: val}} fullWidth={true} onChange={(e) => handleAddressChange(e)} placeholder="search by wallet address(s)" value={accountData[val] ? accountData[val].address : ''}></Input>
                  </Grid>
                  <Grid item xs={3}>
                    <Input inputProps={{data: val}} fullWidth={true} onChange={(e) => handleStartBalance(e)} placeholder="start balance" value={accountData[val] ? accountData[val].startBalance : ''}></Input>
                  </Grid>
                </Grid>

              </Grid>
              )
            })}
          </Grid>
        </Grid>
        <br/>
        <br/>

        {/* submit button */}

        <Button
          style={{backgroundColor:`${theme.pink}`, color: "white"}}
          onClick={handleSubmission}
        >
          Search
        </Button>
      </form>
    </>
  )
}

export default FormContainer