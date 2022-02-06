export default async function handler(req, res) {
  const dbClient = await require("../../../lib/Db").connect()
  const products = await dbClient.collection(process.env.INVENTORY_TABLE).find().toArray()
  
  res.status(200).json(products)
}