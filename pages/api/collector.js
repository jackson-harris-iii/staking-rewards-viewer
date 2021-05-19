import { Collector } from '../../Utils';
import  dummyData from '../../dummyData.json'

export default async (req, res) => {
  let userData = req.body || dummyData;
  console.log('req.body', req.body)
  const data = await Collector(dummyData);
  res.send(data)

}