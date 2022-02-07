export default async function handler(req, res) {
  const { name, count } = req.query

  try {
    const dbClient = await require("../../../lib/Db").connect()

    if (count) {
      if (name) {
        // check if name exists in collection
        const exists = await dbClient.collection(process.env.INVENTORY_TABLE).findOne({name})
        if (exists) res.status(400).json({ message: "item with that name already exists", code: 0 })
        // name doesn't exist
        else {
          const insert = await dbClient.collection(process.env.INVENTORY_TABLE).insertOne({ name, count: parseInt(count) })
          res.status(200).json(insert)
        }
      }
      else res.status(400).json({ message: "please provide a name for the item", code: 1 })
    }
    else res.status(400).json({ message: "please provide an item count", code: 2 })
  }
  catch { res.status(500).json({ message: "db error", code: 3 }) }
}