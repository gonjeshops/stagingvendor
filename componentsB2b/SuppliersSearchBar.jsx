import {useState} from 'react'
import Select from 'react-select';


const SuppliersSearchBar = () => {
    const [input, setInput] = useState('') 
    const [supplierName, setSupplierNAme] = useState(null);
    const [category, setCategory] = useState(null);


    const handleSuppler = (selected) => {
      setSupplierNAme(selected);
    };

    const handleCategory = (selected) => {
      setCategory(selected);
    };
  

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(input)
    }

    const options = [
      {value: 'Supplier 1', label: 'Supplier 1'},
      {value: 'Supplier 2', label: 'Supplier 2'},
      {value: 'Supplier 3', label: 'Supplier 3'},
      {value: 'Supplier 4', label: 'Supplier 4'},
      {value: 'Supplier 5', label: 'Supplier 5'},
      {value: 'Supplier 6', label: 'Supplier 6'},
      {value: 'Supplier 7', label: 'Supplier 7'},
  ]

  return (
    <form onSubmit={handleSubmit} className='py-2 w-full flex gap-4 flex-wrap' >

        <input type="text" name="supplierSearch" id="supplierSearch" 
            className=' p-2 bg-dark100 border  rounded-md '
            placeholder='Search for suppliers...'
            value={input}
            onChange={(e)=>setInput(e.target.value)}
        />
     
            <Select
              value={supplierName}
              onChange={handleSuppler}
              options={options}
              className="min-w-96 bg-light100  text-black focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Search by supplier name"
              isMulti
            />

            <Select
            value={category}
            onChange={handleCategory}
            options={options}
            className="min-w-96 bg-light100  text-black focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Search by supplier category"
            isMulti
          />


    </form>
  )
}

export default SuppliersSearchBar