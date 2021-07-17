import React from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// const options = [
//   'USD',
//   'EUR',
//   'CAD',
//   'RUB',
// ];

const options = [
  ['د.إ','aed'],
  ['$','ars'],
  ['$','aud'],
  ['$','bch'],
  ['$','bdt'],
  ['.د.ب','bhd'],
  ['$','bmd'],
  ['(bnb)','bnb'],
  ['$','brl'],
  ['$','btc'],
  ['$','cad'],
  ['$','chf'],
  ['$','clp'],
  ['$','cny'],
  ['$','czk'],
  ['$','dkk'],
  ['$','dot'],
  ['$','eos'],
  ['$','eth'],
  ['€','eur'],
  ['$','gbp'],
  ['$','hkd'],
  ['$','huf'],
  ['$','idr'],
  ['$','ils'],
  ['$','inr'],
  ['$','jpy'],
  ['$','krw'],
  ['$','kwd'],
  ['$','lkr'],
  ['$','ltc'],
  ['$','mmk'],
  ['$','mxn'],
  ['$','myr'],
  ['$','ngn'],
  ['$','nok'],
  ['$','nzd'],
  ['$','php'],
  ['$','pkr'],
  ['$','pln'],
  ['$','rub'],
  ['$','sar'],
  ['$','sek'],
  ['$','sgd'],
  ['$','thb'],
  ['$','try'],
  ['$','twd'],
  ['$','uah'],
  ['$','usd'],
  ['$','vef'],
  ['$','vnd'],
  ['$','xag'],
  ['$','xau'],
  ['$','xdr'],
  ['$','xlm'],
  ['$','xrp'],
  ['$','yfi'],
  ['$','zar'],
  ['$','bits'],
  ['$','link'],
  ['$','sats']
]


const CurrencyPicker = ({setCurrency}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(48);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    console.log([options[index][0],options[index][1].toUpperCase()])
    setCurrency([options[index][0],options[index][1].toUpperCase()])
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{fontFamily: "Work Sans light"}}>

      <Button
      aria-label={"currency picker"}
      aria-controls="simple-menu"
      aria-haspopup="true"
      onClick={handleClick}>
      {options[selectedIndex][1].toUpperCase()}
      </Button>


      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
      {options.map((option, index) => (
        <MenuItem
          key={option[1]}
          selected={index === selectedIndex}
          onClick={(event) => handleMenuItemClick(event, index)}
        >
          {option[1].toUpperCase()}
        </MenuItem>
      ))}
      </Menu>
    </div>
  );
}
export default CurrencyPicker