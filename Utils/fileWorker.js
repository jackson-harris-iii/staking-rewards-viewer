export function readJSON(filePath) {

  const rawContent = fs.readFileSync(filePath);
  return JSON.parse(rawContent);

}

// genertate urls that contain downloadable csv blobs
export async function downloadCSV(obj) {

  return obj.map(async (item, index) => {
    const data = await extractAsCSV(item);
    const blob = new Blob([data], {type: 'text/csv'});
    return window.URL.createObjectURL(blob);
  })

}

// helper function that converts json obj to csv
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