import { useEffect, useState } from "react";

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
      {data && JSON.stringify(data)}
    </div>
  );
}
 
export default Inventory;