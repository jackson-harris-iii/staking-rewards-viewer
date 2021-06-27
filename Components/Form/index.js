import React, { Fragment, useState, useEffect } from 'react';
import { Container, Input, Grid, Paper, Switch, CircularProgress, Modal } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import DatePicker from 'react-datepicker';
import moment from 'moment'
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';

const FormContainer = ({submission, setSubmission, setIsLoading, currency}) => {
  const theme = useTheme();
  const [priceData, setPriceData ] = useState("true");
  const [exportOutput, setExportOutput ] = useState("true");
  const [address, setAddress ] = useState();
  const [accountData, setAccountData] = useState({0:{}});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [balance, setBalance ] = useState();
  const [addressCount, setAddressCount] = useState([1]);

  const handleAddressChange = (e) => {
    e.preventDefault();
    let key = e.target.attributes.data.value
    let temp =  {...accountData}
    if (temp[key]) {
      temp[key].address = e.target.value
    }  else {
      temp[key] = {address : e.target.value}
    }
    console.log(temp)
    temp[key] = {name: `Account ${parseInt(key) + 1}`, address : e.target.value}
    setAccountData(temp);
  }

  const handleStartBalance = (e) => {
    e.preventDefault();

    let key = e.target.attributes.data.value;
    let temp =  {...accountData};
    if (temp[key]) {
      temp[key].startBalance = parseInt(e.target.value)
    }  else {
      temp[key] = {name: `Account ${parseInt(key) + 1}`, startBalance : parseInt(e.target.value)}
    }
    setAccountData(temp);
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

    setSubmission(payload);

  }

  const handleAddAddress = (e) => {
    let end = Object.keys(addressCount).[addressCount.length - 1]
    console.log(end)
    end < 2 ? setAddressCount([...addressCount, end + 1]) : null;
  }

  const handleRemoveAddress = (e) => {
    let temp = [...addressCount];
    temp.pop()
    setAddressCount([...temp])
  }

  return(
    <>
      <form style={{marginTop: "5em"}}>
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


        <Grid container>
          <Grid item alignItems="flex-end" container xs={12}>
            <Grid alignItems="center" item xs={1}
            >
              <AddCircleIcon onClick={handleAddAddress} style={{color:`${theme.pink}`}}/>
            </Grid>
            {Object.keys(accountData).map((val) => {
              return (
              <Grid item container alignItems="flex-end" justify="flex-end" xs={12} style={{marginTop: ".5em"}}>
                {val > 0 ? <Grid item container xs={1} alignItems="flex-end" justify="flex-end"><CancelIcon inputProps={{data: val}} fontSize="small" onClick={(e) => handleRemoveAddress(e)} /></Grid> : null}
                <Grid item container xs={12} spacing={1}>
                  <Grid item xs={9}>
                    <Input inputProps={{data: val}} fullWidth={true} onChange={(e) => handleAddressChange(e)} placeholder="search by wallet address(s)"></Input>
                  </Grid>
                  <Grid item xs={3}>
                    <Input inputProps={{data: val}} fullWidth={true} onChange={(e) => handleStartBalance(e)} placeholder="start balance"></Input>
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