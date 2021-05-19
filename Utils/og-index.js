import { gatherData } from './gatherData.js';
import { exportVariable, readJSON, writeCSV } from './fileWorker.js';
import { calculateMetrics, verifyUserInput, getNetwork } from './utils.js';


async function main () {
  let obj = {};
  let userInput = readJSON('config/userInput.json');

  let numberPayouts = {
    "DOT": 0,
    "KSM": 0,
  }
  let totalStaked = {
    "DOT": 0,
    "KSM": 0,
  }

  let totalFiat = 0;


  for(let i = 0; i < userInput.addresses.length; i++){
    let network = getNetwork(userInput.addresses[i].address);
    userInput = verifyUserInput(userInput, network);
    let start = userInput.start;
    let end = userInput.end;
    
    let address = userInput.addresses[i].address;
    let currency = userInput.currency;
    let exportOutput = userInput.exportOutput;
    let priceData = userInput.priceData;
    let startBalance = userInput.addresses[i].startBalance;

    obj = await gatherData(start, end, network, address, currency, priceData, startBalance);
    
    // otherwise there were no rewards
    if(obj.data.numberRewardsParsed > 0){
      obj = calculateMetrics(obj);
    }

    if(exportOutput == "true" & obj.message != 'No rewards found for this address'){ 
      exportVariable(JSON.stringify(obj), userInput.addresses[i].name + ' ' + obj.address + '.json'); 
      writeCSV(obj, userInput.addresses[i].name + ' ' + obj.address + '.csv');
    }

    totalFiat = totalFiat + obj.totalValueFiat;

    if(network == "polkadot"){
      totalStaked.DOT = totalStaked.DOT + obj.totalAmountHumanReadable;
      numberPayouts.DOT = numberPayouts.DOT + obj.data.numberRewardsParsed;
    } else {
      numberPayouts.KSM = numberPayouts.KSM + obj.data.numberRewardsParsed;
      totalStaked.KSM = totalStaked.KSM + obj.totalAmountHumanReadable;
    }
  }
    console.log('In total, ' + numberPayouts.DOT + ' DOT and ' + numberPayouts.KSM + ' KSM payouts were found.');
    console.log('The sum of staking rewards are ' + totalStaked.DOT +  ' DOT and ' + totalStaked.KSM + ' KSM' + ', which sums up to a total of ' + totalFiat + ' ' + obj.currency + ' (based on daily prices)');
    console.log('For more information, open the CSV file(s) or copy the content of the JSON file(s) into http://jsonviewer.stack.hu/ (click format).'); 
}
main().catch(console.error).finally(() => process.exit());