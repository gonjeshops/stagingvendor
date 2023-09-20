import React from 'react'

const RadioBtn = ({value, selectedOption, size, setSelectedOption }) => {
   
    const handleRadioBtn = (event) => {
        const newValue = event.target.value;
        setSelectedOption((prevValue) => (prevValue === newValue ? '' : newValue)); 
    };
  return (
    <label>
        <input
            type="radio"
            name="product"
            value={value}
            checked={selectedOption === value}
            onClick={handleRadioBtn}
            className={`w-${size} h-${size} border rounded-md border-zinc-400`}
        />
    </label>
  )
}

export default RadioBtn