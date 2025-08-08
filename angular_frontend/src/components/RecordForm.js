import React, { useState, useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * Flexible record form.
 * @param {object} props - {fields:[{key,label,type,required}], initialValues, onSubmit, onCancel}
 */
function RecordForm({ fields, initialValues, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => initialValues || {});
  const [errors, setErrors] = useState({});

  useEffect(() => { setForm(initialValues || {}); }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((cur) => ({ ...cur, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    fields.forEach(({ key, label, required }) => {
      if (required && !form[key]?.trim()) {
        errs[key] = `${label} is required`;
      }
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
    }
  };

  return (
    <form className="record-form" onSubmit={handleSubmit} autoComplete="off">
      {fields.map((field) => (
        <div key={field.key} className="form-row">
          <label>
            {field.label}
            {field.required && <span className="required">*</span>}
          </label>
          <input
            name={field.key}
            type={field.type || "text"}
            value={form[field.key] || ""}
            onChange={handleChange}
            className={errors[field.key] ? "input-error" : ""}
            autoComplete="off"
          />
          {errors[field.key] && <div className="form-error">{errors[field.key]}</div>}
        </div>
      ))}
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">{initialValues? "Save" : "Create"}</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default RecordForm;
