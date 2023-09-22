import {useState} from 'react';
import { FaRegStar, FaStar, FaAngleDown } from 'react-icons/fa';
import ImgCard from '../card/ImgCard';
import Pagination from '../Pagination';
import { useRouter } from 'next/router';

const InventoryTable = ({data, tableHeader}) => {
    const router = useRouter()
    // paginaation
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 50; // Replace this with the total number of pages in your data

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Fetch data from the server here based on the selected page.
    };

    const handleChange = () => {}

    const [selectedOption, setSelectedOption] = useState('');

    const handleRadioBtn = (event) => {
        const newValue = event.target.value;
        setSelectedOption((prevValue) => (prevValue === newValue ? '' : newValue)); 
    };

return (
    <div className="overflow-x-scroll lg:overflow-visible">
      <table className="min-w-full table-auto lg:w-full">
        <thead>
          <tr className='border-b border-light300'>
            <th className=" py-4 text-start pl-2">
   
                <input
                    type="radio"
                    name="product"
                    value={"option"}
                    checked={selectedOption === 'option'}
                    onChange={handleChange}
                    onClick={handleRadioBtn}
                    className="w-4 h-4 border rounded-md border-zinc-400"
                />
      
            </th>

           {
            tableHeader?.map((item, i )=>(
                <th key={i} className={`px-2 py-4 ${i===6?'text-end pr-2':'text-start'}`} >
                    <div className="flex gap-2 items-center ">
                        <p className="text-sm">{item}</p>
                        <FaAngleDown />
                    </div>
              </th>
            ))
           }

          </tr>
        </thead>

        <tbody>
          {data?.map(({ id, productName,  published, price, productImg, category, tags, qty, liked }) => (
            <tr key={id} className='border-b   border-light300 bg-hover300  duration-300' >
              <td className="pl-2 py-4 text-start w-10">
                <label>
                <input
                    type="radio"
                    name="product"
                    value={"option"+id}
                    checked={selectedOption === 'option'+id}
                    onClick={handleRadioBtn}
                    onChange={handleChange}
                    className="w-4 h-4 border rounded-md border-zinc-400"
                />
                </label>
              </td>

              <td className="px-2  ">
                <div className="flex gap-2 items-center">
                    <div className="overflow-hidden h-8 w-8 rounded-full flex-shrink-0 bg-blue-200">

                        { productImg ? 
                            <ImgCard src={productImg} alt={category}/>  :
                            
                            <div className='flex items-center w-full h-full justify-center bg-blue-300'> </div>}
                    </div>
                </div>
              </td>

              <td className="px-2">
                <p className="text-blue">{productName}</p>
              </td>

              <td className="px-2">
                <p className="">{price}</p>
              </td>

              <td className="px-2">
                <p className="">{category}</p>
              </td>

              <td className="px-2 py-2 lg:w-48 flex text-[10px] items-center gap-2 flex-wrap">
                {
                  tags?.map((item, i)=>(
                    <p key={i} className="flex-shrink-0 px-1 text-zinc-800 bg-zinc-300">{item}</p>
                  ))
                }
              </td>

              <td className={`px-2 text-yellow-500`}>
                {liked ? <FaStar/> : <FaRegStar/>}
              </td>

              <td className='px-2 '>
                {qty}
              </td>
              <td className='px-2'>
                {published}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center items-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default InventoryTable;
