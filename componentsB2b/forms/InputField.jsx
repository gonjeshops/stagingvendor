import React from 'react';

function InputField({ label, name, value, onChange, error, type = 'text' }) {
  return (
    <div className="mb-">
      <label className="block mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`appearance-none w-full bg-white border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default InputField;
