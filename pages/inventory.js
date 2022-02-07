import { useEffect, useState } from "react";
import InventoryTable from "../components/InventoryTable"

const Inventory = () => {
  const [data, setData] = useState(false)
  
  useEffect(() => {
    fetch('/api/inventory')
    .then(res => res.json())
    .then(data => {
      setData(data)
    })
  }, [])

  return (
    <div className="container">
      {!data && "loading"}
      {data && <InventoryTable items={data}/>}
      
    </div>
  );
}
 
export default Inventory;