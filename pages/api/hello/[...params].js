import apidata from '../../../components/data'

export default function handler(req, res) {
  const {
    query: {params: [id, item]}
  } = req

  const result = {id: id, item: apidata[id][item]}
  res.json(result)
}