import React, { useState } from 'react';
import Select from 'react-select';



const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: '0.375rem',
      borderColor: state.isFocused ? '#60A5FA' : '#E5E7EB',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(66, 153, 225, 0.5)' : 'none',
      '&:hover': { borderColor: '#A5B4FC' },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#60A5FA' : 'white',
      color: state.isSelected ? 'white' : '#374151',
      '&:hover': { backgroundColor: '#E5E7EB' },
    }),
  };


function SelectInput({ value, onChange, options, placeholder, label, error}) {
  const [selectedCard, setSelectedCard] = useState('');

  const handleCardChange = (selectedOption) => {
    setSelectedCard(selectedOption);
  };



  return (
    <div className="">
        {/* <label className="block mb-1" htmlFor={name}>
        {label}
      </label> */}
         <Select
            value={value}
            onChange={onChange}
            options={options}
            placeholder={placeholder}
            styles={customStyles}
        />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      
      {/* <select
        className="block appearance-none w-full border border-zinc-300 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        value={selectedCard}
        onChange={handleCardChange}
      >
        <option value="">Select a card</option>
        {options.map((card, index) => (
          <option key={index} value={card}>
            {card}
          </option>
        ))}
      </select> */}
    </div>
  );
}

export default SelectInput;
