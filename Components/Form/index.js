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
  const [accountData, setAccountData] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [balance, setBalance ] = useState();
  const [addressCount, setAddressCount] = useState([1]);

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

    setSubmission(payload);

  }

  const handleAddAddress = () => {
    let end = addressCount[addressCount.length - 1]
    console.log(end)
    end < 5 ? setAddressCount([...addressCount, end + 1]) : null;
  }

  const handleRemoveAddress = () => {
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
            // style={{marginRight: '1.75em'}}
            >
              <AddCircleIcon onClick={handleAddAddress} style={{color:`${theme.pink}`}}/>
            </Grid>
            {addressCount.map((val) => {
              return (
              <Grid item container alignItems="flex-end" justify="flex-end" xs={12} style={{marginTop: ".5em"}}>
                {val > 1 ? <Grid item xs={1} alignItems="flex-end" justify="flex-end"><CancelIcon fontSize="small" onClick={handleRemoveAddress} /></Grid> : null}
                <Grid item container xs={12} spacing={1}>
                  <Grid item xs={9}>
                    <Input fullWidth={true} onChange={(e) => handleAddressChange(e)} placeholder="search by wallet address(s)"></Input>
                  </Grid>
                  <Grid item xs={3}>
                    <Input fullWidth={true} onChange={(e) => handleStartBalance(e)} placeholder="start balance"></Input>
                  </Grid>
                </Grid>

              </Grid>
              )
            })}
          </Grid>
        </Grid>
        <br/>
        <br/>
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