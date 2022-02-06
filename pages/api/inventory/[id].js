export default async function handler(req, res) {
  const { id } = req.query
  const oId = new require("mongodb").ObjectId(id)

  const dbClient = await require("../../../lib/Db").connect()
  const product = await dbClient.collection(process.env.PRODUCTS_TABLE).findOne({_id: oId})
  
  res.status(200).json(product)
}