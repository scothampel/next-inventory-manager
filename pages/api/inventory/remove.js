export default async function handler(req, res) {
  const { id, count } = req.query
  const oId = new require("mongodb").ObjectId(id)

  try {
    const dbClient = await require("../../../lib/Db").connect()
    if (id) {
      const del = await dbClient.collection(process.env.INVENTORY_TABLE).deleteOne({ _id: oId })
      if (del.deletedCount === 1) res.status(200).json(del)
      else res.status(404).json({ message: "id not found" })
    }
    else res.status(400).json({ message: "please provide an item id" })
  }
  catch { res.status(500).json({ message: "db error" }) }
}