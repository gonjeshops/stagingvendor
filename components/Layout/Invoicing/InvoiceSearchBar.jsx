import { Button } from '@/components/ui/button';
import {useState} from 'react'
import { FaSearch } from 'react-icons/fa';
import Select from 'react-select';


const InvoiceSearchBar = ({setSearch, type}) => {
    const [input, setInput] = useState('') 
    const [category, setCategory] = useState(null);

    const handleCategory = (selected) => {
      setCategory(selected);
    };

    const options = [
      {value: 'ACCEPTED', label: 'ACCEPTED'},
      {value: 'PAID', label: 'PAID'},
      {value: 'COMPLETED', label: 'COMPLETED'},
    ]

  return (
    <div className="px-4 flex justify-between items-center gap-4">
        <div className="relative bg-dark100 border  w-80 flex rounded-md ">
            <input type="text" name="supplierSearch" id="supplierSearch" 
                className='w-80 p-2   '
                placeholder='Search invoice'
                value={input}
                onChange={(e)=>setInput(e.target.value)}
            />
            <button onClick={()=>setSearch(input)}
            className='px-3 border-l bg-gonje-green text-white duration-300'><FaSearch/></button>
        </div>

        <Select
          value={category}
          onChange={handleCategory}
          options={options}
          className="w-80 bg-light100  text-black focus:outline-none focus:ring focus:border-green-300"
          placeholder="Select Invoice Status"
        />            
    </div>
  )
}

export default InvoiceSearchBar