export default async function handler(req, res) {
  const { id, count } = req.query

  try {
    const dbClient = await require("../../../lib/Db").connect()

    if (id) {
      if (count) {
        try {
          const oId = require("mongodb").ObjectId(id)
          const update = await dbClient.collection(process.env.INVENTORY_TABLE).updateOne({ _id: oId }, { $set: { count: parseInt(count) } })
          res.status(200).json(update)
        }
        catch {res.status(400).json({ message: "please provide a valid id" })}
      }
      else res.status(400).json({ message: "please provide an item count" })
    }
    else res.status(404).json({ message: "please provide a valid id" })
  }
  catch { res.status(500).json({ message: "db error" }) }
}