import React from "react";

// PUBLIC_INTERFACE
function DataTable({ columns, data, onEdit, onDelete }) {
  /**
   * Table renderer.
   * @param {array} columns - [{key,label}]
   * @param {array} data - Array of record objects
   * @param {func} onEdit - function(record)
   * @param {func} onDelete - function(record)
   */
  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            <th className="text-center" style={{minWidth: 88}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length ? data.map((row) => (
            <tr key={row._id || JSON.stringify(row)}>
              {columns.map((col) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
              <td className="action-cell">
                <button className="btn btn-accent btn-sm" onClick={() => onEdit(row)}>Edit</button>
                <button className="btn btn-secondary btn-sm" onClick={() => onDelete(row)}>Delete</button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-center" style={{color:"var(--text-secondary)"}}>No records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
