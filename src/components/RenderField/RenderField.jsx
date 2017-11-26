import React from 'react';
import PropTypes from 'prop-types';

function RenderField(props) {
  const {
    input,
    className,
    label,
    type,
    textarea,
    rows,
    id,
    meta: { touched, warning, error },
  } = props;
  const textareaType = <textarea {...input} placeholder={label} type={type} rows={rows} className={(touched && ((error && `${className} is-invalid`))) || className} />;
  const inputType = <input {...input} placeholder={label} type={type} className={(touched && ((error && `${className} is-invalid`))) || className} />;

  return (
    <div className="mb-3">
      <label htmlFor={id}>
        {label}
      </label>
      {textarea ? textareaType : inputType}
      {touched && ((error && <div className="invalid-feedback">{error}</div>) || (warning && <span className="text-warning">{warning}</span>))}
    </div>
  );
}

RenderField.defaultProps = {
  warning: undefined,
  error: undefined,
  touched: undefined,
  textarea: false,
  type: undefined,
  rows: undefined,
};

RenderField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  textarea: PropTypes.bool,
  rows: PropTypes.string,
  id: PropTypes.string.isRequired,
  touched: PropTypes.bool,
  warning: PropTypes.string,
  error: PropTypes.string,
};

export default RenderField;
