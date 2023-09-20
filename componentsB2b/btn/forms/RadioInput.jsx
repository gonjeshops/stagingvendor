import React from 'react';

function RadioInput({ label, name, value, onClick, checked, onChange }) {
  return (
    <div className="flex items-center gap-2">
      
      <input
        type="radio"
        onClick={onClick}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
      />
      <label className="block text-sm ">
        {label}
      </label>
    </div>
  );
}

export default RadioInput;
