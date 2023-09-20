import React, { useState } from 'react';
import SelectInput from '../btn/SelectInput';
import DateInput from '../forms/DateInput';
import InputField from '../forms/InputField';
import RadioInput from '../forms/RadioInput';
import RadioBtn from '../btn/RadioBtn';

function CheckoutForm({cardData}) {
  const [selectedOption, setSelectedOption] = useState('');

  const [formData, setFormData] = useState({
    selectedOption: selectedOption,
    fullName: '',
    selectedCard: null,
    selectedDate: '',
    cardNumber: '',
    cvc: '',
    saveCard: false
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCardChange = (selectedOption) => {
    setFormData({
      ...formData,
      selectedCard: selectedOption,
    });
  };

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveCardChange = (event) => {

    const isChecked = event.target.checked;
    
    setFormData({
      ...formData,
      saveCard: !formData.saveCard
    });
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.selectedCard) {
      newErrors.selectedCard = 'Please select a card';
    }
    if (!formData.selectedDate) {
      newErrors.selectedDate = 'Date is required';
    }
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    }
    if (!formData.cvc.trim()) {
      newErrors.cvc = 'CVC is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Handle form submission logic here
      console.log('Form submitted:', formData);
    }
  };


  const cardOptions = cardData.map((card) => ({
    value: card,
    label: card,
  }));

  return (
    <form className="w-full space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-4 sm:gap-10">
                <div className="transfer items-center flex-shrink-0 flex gap-2">
                    <RadioBtn size='4'  value={'transfer'} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                    <p>Bank Transfer</p>
                </div>
                <div className="transfer items-center flex-shrink-0 flex gap-2">
                    <RadioBtn size='4'  value={'creditCard'} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                    <p>Credit card</p>
                </div>
                <div className="transfer items-center flex-shrink-0 flex gap-2">
                    <RadioBtn size='4'  value={'paypal'} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                    <p>Paypal</p>
                </div>
                <div className="transfer items-center flex-shrink-0 flex gap-2">
                    <RadioBtn size='4'  value={'coupon'} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                    <p>Coupon</p>
                </div>
            </div>

        <div className="w-full grid sm:flex gap-4 items-center">
            <div className="w-full">
                <SelectInput
                    label="Select a Card:"
                    label2="Select a Card:"
                    value={formData.selectedCard}
                    onChange={handleCardChange}
                    options={cardOptions}
                    placeholder="Select a card"
                    error={errors.selectedCard}
                />
            </div>
            <div className="w-full">
                <InputField
                    label="Card Number:"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    error={errors.cardNumber}
                    type='number'
                />
            </div>
        </div>

        <div className="w-full">
            <InputField
                label="Full Name:"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                error={errors.fullName}
                type='text'
            />
        </div>

        <div className="w-full flex gap-6">
            <div className="w-full">
                {/* <h5>Expires on</h5> */}
                <DateInput
                    label="Expires on"
                    name="selectedDate"
                    value={formData.selectedDate}
                    onChange={handleDateChange}
                    error={errors.selectedDate}
                />
            </div>
            <div className="w-full">
                {/* <h5>CVC</h5> */}
                <InputField
                    label="CVC:"
                    name="cvc"
                    value={formData.cvc}
                    onChange={handleInputChange}
                    error={errors.cvc}
                    type='number'
                />
            </div>
        </div>
      
        <div className="">
            <RadioInput
              label={'Save Card'}
              name={'saveCard'}
              checked={formData.saveCard}
              onChange={()=>{}}
              onClick={handleSaveCardChange}
            />           
        </div>

        <div className="sm:flex grid w-full gap-6">
            <button onClick={handleSubmit}
            type="submit"
            className= "sm:w-2/3 bg-blue-500 hover:bg-blue-600 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
            Place Order
        </button>
        <button onClick={handleSubmit}
            type="submit"
            className= "sm:w-1/3 hover:bg-blue-600 hover:text-white border   w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
            Save and Exit
        </button>

        </div>

      
    </form>
  );
}

export default CheckoutForm;
