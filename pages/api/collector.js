import Collector from '../../Utils';
import dummyData from '../../dummyData.json'


export default async (req, res) => {
  let userData = req.body || dummyData;
  if (req.body) {
    console.log('req.body', req.body)
    const data = await Collector(userData);
    res.send(data)
  } else {
    res.send(200)
  }
  // console.log('collector?', typeof Collector)

}