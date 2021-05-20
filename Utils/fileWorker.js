import fs from 'fs';
import path from 'path'

export function exportVariable(data, name){
    // try {
    //     const location = path.join('./public', name);
    //     fs.writeFileSync(location, data);
    //     } catch (err) {
    //     console.error(err);
    //     }
}

export function readJSON(filePath) {
    const rawContent = fs.readFileSync(filePath);

    return JSON.parse(rawContent);
  }

  export function writeCSV(obj, name){
    const filename = name;
    const location = path.join('./public', name);

    //  try {
    //      fs.writeFileSync(location, extractAsCSV(obj));
    //     } catch (err){
    //     console.error(err);
    //     }
    }

  function extractAsCSV(obj){
    const header = [
        "Day, Price in " + obj.currency +
        `, Daily ${((obj.network == 'polkadot') ? 'DOT' : 'KSM')} Volume` +
        ", Staking Rewards in" + ((obj.network == 'polkadot') ? ' DOT' : ' KSM') +
        ", Number of Payouts" +
        ", Value in Fiat"
    ];

    const rows = obj.data.list
        .filter(entry => entry.numberPayouts > 0)
        .map(entry => `${entry.day}, ${entry.price}, ${entry.volume}, ${entry.amountHumanReadable}, ${entry.numberPayouts}, ${entry.valueFiat}`);

      return header.concat(rows).join("\n");
  }