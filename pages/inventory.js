import { useEffect, useState } from "react";
import AddItem from "../components/AddItem";
import InventoryTable from "../components/InventoryTable"

const Inventory = () => {
  const [items, setItems] = useState(false)
  
  useEffect(() => {
    fetch('/api/inventory')
    .then(res => res.json())
    .then(data => {
      setItems(data)
    })
  }, [])

  return (
    <div className="container">
      {!items && "loading"}
      {items && <InventoryTable items={items}/>}
      {items && <AddItem items={items} setItems={setItems}/>}
    </div>
  );
}
 
export default Inventory;