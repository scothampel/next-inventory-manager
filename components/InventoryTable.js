import JsBarcode from "jsbarcode"
import styles from '../styles/InventoryTable.module.css'

const InventoryTable = ({ items }) => {
  const handleBarcodeClick = (e) => {
    const barcode = e.target.dataset.code
    JsBarcode('#barcode-svg', barcode)
  }

  const handleEditClick = (e) => {
    const { id, name, count } = e.target.dataset
    document.getElementById('edit-name').value = name
    document.getElementById('edit-count').value = count
    document.getElementById('edit-id').value = id
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const name = e.target[0].value
    const count = e.target[1].value
    const id = e.target[2].value

    fetch(`/api/inventory/set?id=${id}&name=${name}&count=${count}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        
      })
  }

  return (
    <div>
      <table className="table text-center">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Count</th>
            <th scope="col">Barcode</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {items.map(v => {
            return (
              <tr key={v._id}>
                <th scope="row">{v.name}</th>
                <td>{v.count}</td>
                <td><button type="button" className="btn btn-dark" data-code={v._id} data-bs-toggle="modal" data-bs-target="#barcode-modal" onClick={handleBarcodeClick}>Generate</button></td>
                <td><button type="button" className="btn btn-outline-dark" data-id={v._id} data-name={v.name} data-count={v.count} data-bs-toggle="modal" data-bs-target="#edit-modal" onClick={handleEditClick}>Edit</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="modal fade" id="barcode-modal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Barcode</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <svg id="barcode-svg" className={styles['barcode-svg']}></svg>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="edit-modal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="edit-name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="edit-name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="edit-count" className="form-label">Count</label>
                  <input type="number" className="form-control" id="edit-count" />
                </div>
                <input type="text" className="d-none" id="edit-id" />

              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-dark">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryTable;