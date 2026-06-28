import { forwardRef } from 'react';
import './Input.css';

export const Input = forwardRef(function Input(
  { label, error, icon, className = '', id, ...rest },
  ref
) {
  const inputId = id || rest.name;

  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-group__label">
          {label}
        </label>
      )}
      <div className="input-group__wrapper">
        {icon && <span className="input-group__icon">{icon}</span>}
        <input
          ref={ref}
          id={inputId}
          className={`input-group__field ${icon ? 'input-group__field--with-icon' : ''} ${
            error ? 'input-group__field--error' : ''
          }`}
          {...rest}
        />
      </div>
      {error && <span className="input-group__error">{error}</span>}
    </div>
  );
});