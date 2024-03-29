import { Button ,} from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
         <div className="relative   flex gap-1 ">
            <Input type="text" name="supplierSearch" id="supplierSearch" 
                className='w-80 px-3 py-3 '
                placeholder='Search order listing'
                value={input}
                onChange={(e)=>setInput(e.target.value)}
            />
            <button onClick={()=>setSearch(input)}
            className='px-3 bg-gonje-green rounded-md text-white '><FaSearch/></button>
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