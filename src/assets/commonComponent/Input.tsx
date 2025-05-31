// InputField.tsx
import React from "react";

type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  touched?: boolean;
};

const Input: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  touched,
}) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label
        htmlFor={name}
        style={{ display: "block", marginBottom: "0.5rem" }}
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "0.5rem",
          border: touched && error ? "1px solid red" : "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      {touched && error && (
        <div
          style={{ color: "red", marginTop: "0.25rem", fontSize: "0.875rem" }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
