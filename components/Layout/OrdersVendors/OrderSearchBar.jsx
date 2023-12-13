import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {useState} from 'react'
import { FaSearch } from 'react-icons/fa';
import Select from 'react-select';


const OrderSearchBar = ({setSearch}) => {

    const [input, setInput] = useState('') 
    const [category, setCategory] = useState(null);

    const handleCategory = (selected) => {
        setCategory(selected);
    };

    const options = [
        {value: 'PAID', label: 'PAID'},
        {value: 'COMPLETED', label: 'COMPLETED'},
    ]

    return (
    <div className="px-4 flex justify-between items-center gap-4">

        <div className="relative bg-dark100   flex rounded-md ">
            <input type="text" name="supplierSearch" id="supplierSearch" 
                className='w-80 p-2 border  '
                placeholder='Search order listing'
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
            placeholder="Filter with Order Status"
        />            
    </div>
    )
}
    
export default OrderSearchBar