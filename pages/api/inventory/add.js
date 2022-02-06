export default async function handler(req, res) {
  const { id, name, count } = req.query

  try {
    const dbClient = await require("../../../lib/Db").connect()

    if (count) {
      // id provided
      if (id) {
        // check for invalid item id
        try {
          const oId = new require("mongodb").ObjectId(id)
          const item = await dbClient.collection(process.env.INVENTORY_TABLE).findOne({ _id: oId })

          // check valid item exists with id
          if (item) {
            const update = await dbClient.collection(process.env.INVENTORY_TABLE).updateOne({ _id: oId }, { $set: { count: item.count + parseInt(count) } })
            res.status(200).json(update)
          }
          else res.status(404).json({ message: "item not found" })
        }
        catch { res.status(400).json({ message: "invalid item id" }) }
      }
      // no item id provided
      else {
        // check for name
        if (name) {
          const insert = await dbClient.collection(process.env.INVENTORY_TABLE).insertOne({ name, count: parseInt(count) })
          res.status(200).json(insert)
        }
        else res.status(400).json({ message: "please provide a name for the item" })
      }
    }
    else res.status(400).json({ message: "please provide an item count" })
  }
  catch { res.status(500).json({ message: "db error" }) }
}