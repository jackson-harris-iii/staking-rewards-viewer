import Collector from '../../Utils';
import dummyData from '../../dummyData.json'


export default async (req, res) => {
  let userData = req.body || dummyData;
  if (req.body) {
    // console.log('req.body', req.body)
    const data = await Collector(userData);
    try {
      res.send(data)
    } catch(err) {
      res.send(err)
    }
  } else {
    res.send(200)
  }

}