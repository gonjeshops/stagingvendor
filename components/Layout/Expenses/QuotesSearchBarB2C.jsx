import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {useState} from 'react'
import { FaSearch } from 'react-icons/fa';
import Select from 'react-select';


const QuotesSearchBarB2c = ({setSearch, type}) => {
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
      {value: 'PENDING', label: 'PENDING'},
      {value: 'SENT', label: 'SENT'},
      {value: 'ACCEPTED', label: 'ACCEPTED'},
      {value: 'REJECTED', label: 'REJECTED'},
      {value: 'CANDELED', label: 'CANDELED'},
      {value: 'PAID', label: 'PAID'},
      {value: 'COMPLETED', label: 'COMPLETED'},
    ]


  return (
    <form onSubmit={handleSubmit} className='py-2 w-full flex  justify-between gap-4 flex-wrap' >
       
       <div className="relative   flex gap-1 ">
            <Input type="text" name="supplierSearch" id="supplierSearch" 
                className='w-80 px-3 py-4 '
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
            placeholder="Select Quotes Status"
            // isMulti
          />

         {type === 'sent' &&  <div className="flex flex-wrap gap-2 items-center">
            <Button className='bg-gonje-green text-md '>Pending Quotes</Button>
            <Button className='bg-gonje-green text-lg '>Sent Quotes</Button>
            </div>}

            
    </form>
  )
}

export default QuotesSearchBarB2c