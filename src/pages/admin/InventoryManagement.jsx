import { mockInventory } from '../../data/mockData';

export default function InventoryManagement() {
  return (
    <div className="page-enter space-y-6">
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900">Inventory Management</h1>

      {/* Raw Materials */}
      <div className="card">
        <h3 className="font-display font-bold text-surface-900 mb-4">🌾 Raw Materials</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-surface-100 bg-surface-50">
              <th className="table-header">Material</th>
              <th className="table-header">Quantity</th>
              <th className="table-header">Grade</th>
              <th className="table-header">Warehouse</th>
              <th className="table-header">Reorder</th>
              <th className="table-header">Status</th>
            </tr></thead>
            <tbody>
              {mockInventory.raw_materials.map((item, i) => (
                <tr key={i} className="table-row">
                  <td className="table-cell font-medium">{item.name}</td>
                  <td className="table-cell font-semibold">{item.quantity_available} {item.unit}</td>
                  <td className="table-cell"><span className={`badge ${item.quality_grade === 'A' ? 'badge-success' : item.quality_grade === 'B' ? 'badge-warning' : 'badge-neutral'}`}>Grade {item.quality_grade}</span></td>
                  <td className="table-cell text-xs">{item.warehouse}</td>
                  <td className="table-cell">{item.reorder_level} {item.unit}</td>
                  <td className="table-cell">
                    <span className={`badge ${item.quantity_available > item.reorder_level * 2 ? 'badge-success' : item.quantity_available > item.reorder_level ? 'badge-warning' : 'badge-danger'}`}>
                      {item.quantity_available > item.reorder_level * 2 ? 'Good' : item.quantity_available > item.reorder_level ? 'Low' : 'Critical'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Finished Products */}
      <div className="card">
        <h3 className="font-display font-bold text-surface-900 mb-4">📦 Finished Products</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-surface-100 bg-surface-50">
              <th className="table-header">Product</th>
              <th className="table-header">Available</th>
              <th className="table-header">Reserved</th>
              <th className="table-header">Warehouse</th>
              <th className="table-header">Reorder Level</th>
              <th className="table-header">Status</th>
            </tr></thead>
            <tbody>
              {mockInventory.finished_products.map((item, i) => (
                <tr key={i} className="table-row">
                  <td className="table-cell font-medium">{item.product_name}</td>
                  <td className="table-cell font-semibold">{item.quantity_available.toLocaleString()}</td>
                  <td className="table-cell text-amber-600">{item.reserved.toLocaleString()}</td>
                  <td className="table-cell text-xs">{item.warehouse}</td>
                  <td className="table-cell">{item.reorder_level.toLocaleString()}</td>
                  <td className="table-cell">
                    <span className={`badge ${item.quantity_available > item.reorder_level * 3 ? 'badge-success' : item.quantity_available > item.reorder_level ? 'badge-warning' : 'badge-danger'}`}>
                      {item.quantity_available > item.reorder_level * 3 ? 'Good' : item.quantity_available > item.reorder_level ? 'Low' : 'Critical'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
