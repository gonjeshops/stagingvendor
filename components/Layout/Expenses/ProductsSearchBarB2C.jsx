import {useState} from 'react'
import { FaSearch } from 'react-icons/fa';
import Select from 'react-select';


const ProductsSearchBarB2C = ({setSearch}) => {
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
      {value: 'Product 1', label: 'Product 1'},
      {value: 'Product 2', label: 'Productr 2'},
      {value: 'Product 3', label: 'Product  3'},
      {value: 'Supplier 4', label: 'Supplier 4'},
      {value: 'Supplier 5', label: 'Supplier 5'},
      {value: 'Supplier 6', label: 'Supplier 6'},
      {value: 'Supplier 7', label: 'Supplier 7'},
  ]
  return (
    <form onSubmit={handleSubmit} className='py-2 w-full flex  justify-between gap-4 flex-wrap' >
       
        <div className="relative bg-dark100 border  w-80 flex rounded-md ">
        <input type="text" name="supplierSearch" id="supplierSearch" 
            className='w-80 p-2   '
            placeholder='Search product'
            value={input}
            onChange={(e)=>setInput(e.target.value)}
        />
        <button onClick={()=>setSearch(input)}
        className='px-3 border-l bg-gonje-green text-white duration-300'><FaSearch/></button>

        </div>

          <Select
              value={supplierName}
              onChange={handleSuppler}
              options={options}
              className="w-80 bg-light100  text-black focus:outline-none focus:ring focus:border-green-300"
              placeholder="Search shop name"
              isMulti
            />

            <Select
            value={category}
            onChange={handleCategory}
            options={options}
            className="w-80 bg-light100  text-black focus:outline-none focus:ring focus:border-green-300"
            placeholder="Search product category"
            isMulti
          />

    </form>
  )
}

export default ProductsSearchBarB2C