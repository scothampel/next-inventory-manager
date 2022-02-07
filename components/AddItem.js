const AddItem = ({ items, setItems }) => {
  const handleSubmit = (e) => {
    e.preventDefault()

    const name = e.target[0].value
    const count = e.target[1].value

    fetch(`/api/inventory/add?name=${name}&count=${count}`)
      .then(res => res.json())
      .then(data => {
        const error = data.message
        const ack = data.acknowledged
        const id = data.insertedId
        if (ack) {
          setItems([...items, {_id: id, name, count}])
          console.log("added", data)
        }
        else {
          console.log(error)
        }
      })
  }

  return (
    <form className="row row-cols-2 row-cols-md-3 justify-content-center align-items-center g-2" onSubmit={handleSubmit}>
      <div className="col-8 col-md-4">
        <div className="form-floating">
          <input type="text" id="add-name" className="form-control form-control-sm" placeholder="Name" />
          <label htmlFor="add-name" className="form-label">Name</label>
        </div>
      </div>
      <div className="col-4 col-md-2">
        <div className="form-floating">
          <input type="number" id="add-count" className="form-control" placeholder="count" />
          <label htmlFor="add-count" className="form-label">Count</label>
        </div>
      </div>
      <div className="col-12 col-md-2 text-center">
        <button type="submit" className="btn btn-dark btn-lg w-100">Add Item</button>
      </div>
    </form>
  );
}

export default AddItem;