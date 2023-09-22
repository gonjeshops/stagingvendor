import React from 'react';

function DateInput({ label, name, value, onChange, error }) {
  return (
    <div className="">
      <label className="block text-sm mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        type="date"
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

export default DateInput;
