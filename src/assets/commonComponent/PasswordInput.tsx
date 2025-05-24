import React, { useState } from "react";
type PasswordInputProps = {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string; // <-- Add this line
};

const PasswordInput: React.FC<PasswordInputProps> = ({
  label = "Password",
  name,
  value,
  onChange,
  placeholder = "Enter your password",
  autoComplete = "new-password", // default to prevent autofill
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label
        htmlFor={name}
        style={{ display: "block", marginBottom: "0.5rem" }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <input
          type={showPassword ? "text" : "password"}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete} // <-- Apply here
          style={{
            width: "100%",
            padding: "0.5rem",
            paddingRight: "2.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        <button
          type="button"
          onClick={togglePasswordVisibility}
          style={{
            position: "absolute",
            right: "0.5rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "0.9rem",
            color: "#007BFF",
          }}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
