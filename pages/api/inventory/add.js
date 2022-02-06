export default async function handler(req, res) {
  const { name, count } = req.query

  try {
    const dbClient = await require("../../../lib/Db").connect()

    if (count) {
      if (name) {
        const insert = await dbClient.collection(process.env.INVENTORY_TABLE).insertOne({ name, count: parseInt(count) })
        res.status(200).json(insert)
      }
      else res.status(400).json({ message: "please provide a name for the item" })
    }
    else res.status(400).json({ message: "please provide an item count" })
  }
  catch { res.status(500).json({ message: "db error" }) }
}