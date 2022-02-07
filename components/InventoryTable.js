import JsBarcode from "jsbarcode"
import styles from '../styles/InventoryTable.module.css'

const InventoryTable = ({ items }) => {
  const handleClick = (e) => {
    const barcode = e.target.dataset.code
    JsBarcode('#barcode-svg', barcode)
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Count</th>
            <th scope="col">Barcode</th>
          </tr>
        </thead>
        <tbody>
          {items.map(v => {
            return (
              <>
                <tr key={v._id}>
                  <th scope="row">{v.name}</th>
                  <td>{v.count}</td>
                  <td><button className="btn btn-dark" data-code={v._id} data-bs-toggle="modal" data-bs-target="#barcode-modal" onClick={handleClick}>Generate</button></td>
                </tr>
              </>
            )
          })}
        </tbody>
      </table>
      <div className="modal fade" id="barcode-modal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Barcode</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <svg id="barcode-svg" className={styles['barcode-svg']}></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryTable;