import React from "react";

/**
 * PUBLIC_INTERFACE
 * Confirmation modal dialog.
 * @param {object} props - {open, message, onConfirm, onCancel}
 */
function ConfirmModal({ open, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-message">{message}</div>
        <div className="modal-actions">
          <button className="btn btn-accent" onClick={onConfirm}>Confirm</button>
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
