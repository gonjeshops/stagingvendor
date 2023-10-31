import {useState} from 'react';
import { FaEnvelope, FaAngleDown, FaImage, FaStar, FaHeart } from 'react-icons/fa';
import ImgCard from '../card/ImgCard';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { truncateText } from '@/lib/truncateText';

const InvoiceTable2 = ({data, invoicess, tableHeader}) => {
    const router = useRouter()
    console.log('INVOICE====', invoicess)

    const [selectedOption, setSelectedOption] = useState('');

    const handleRadioBtn = (event) => {
        const newValue = event.target.value;
        setSelectedOption((prevValue) => (prevValue === newValue ? '' : newValue)); 
    };

    const handleChange= () => {}

    // displaying product
    const [selectedProduct, setSelectedProduct] = useState(invoicess[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = (product) => {
      setSelectedProduct(product);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setSelectedProduct(null);
      setIsModalOpen(false);
    };

  return (
    <div className="overflow-x-scroll lg:overflow-visible">
      <table className="min-w-full table-auto lg:w-full">
        <thead>
          <tr className='border-b border-light300'>
            <th className="pl-2 py-4 text-start ">
            <label>
                <input
                    type="radio"
                    name="product"
                    value={"option"}
                    checked={selectedOption === 'option'}
                    onClick={handleRadioBtn}
                    onChange={handleChange}
                    className="w-4 h-4 border rounded-md border-zinc-400"
                />
                </label>
            </th>

           {
            tableHeader?.map((item, i )=>(
                <th key={i} className={`px-2 py-4 ${i===6?'text-end pr-2':'text-start'}`} >
                    <div className="flex gap-2 items-center ">
                        <p className="text-sm">{item}</p>
                        {/* <FaAngleDown /> */}
                    </div>
              </th>
            ))
           }

          </tr>
        </thead>

        <tbody>
          {
            invoicess?.map((item, idx) => {
                // tableHeader: ['QUOTE ID', 'INVOICE ID', 'QUOTE NAME', 'SHOP NAME','BUYER NAME', 'ITEMS',  'AMOUNT', 'STATUS', 'DATE']
             return ( <tr key={item?.id} className='border-b   border-light300 bg-hover300  duration-300' 
            // onClick={()=>router.push(`/vendorb2b/workspace/invoices/${item?.id}`)} 
            >
              <td className="pl-2 py-4 text-start w-10">
                <label>
                <input
                    type="radio"
                    name="product"
                    value={"option"+item?.id}
                    checked={selectedOption === 'option'+item?.id}
                    onClick={handleRadioBtn}
                    onChange={handleChange}
                    className="w-4 h-4 border rounded-md border-zinc-400"
                />
                </label>
              </td>

              <td className="px-2">
                <p className="text-blue">{item?.id}</p>
              </td>

              <td className="px-2">
                <p className="text-blue">{item?.id}</p>
              </td>

              <td className="px-2">
                <p className="text-blue">{item?.quote_name}</p>
              </td>

              <td className="px-2">
                <p className="text-">{item?.shop_name}</p>
              </td>

              <td className="px-2">
                <p className="text-">{item?.user_name}</p>
              </td>

              <td className="px-2  ">
                <div className="flex gap-2 items-center flex-wrap">
                    {JSON.parse(item?.cart_items)?.map((product, idx) => (
                        <div key={idx} className="shrink-0">
                        <p className="text-blue-500 hover:underline cursor-pointer"  onClick={() => openModal(product)} >
                            {product?.name}{idx !== JSON.parse(item?.cart_items)?.length - 1 && <span>, </span>}
                        </p>
                        {
                        <ProductModal isOpen={isModalOpen} closeModal={closeModal} product={selectedProduct} />
                        }
                        </div>
                    ))}
                </div>

              </td>

              <td className='px-2'>
                ${item?.subtotal}
              </td>

              <td className='px-2 uppercase'>
                {item?.status}
              </td>
              <td className='px-2'>
                {new Date(item?.created_at).toLocaleDateString()}
              </td>
            </tr>
             )
           })
          }

         
        </tbody>
      </table>

     
    </div>
  );
};

export default InvoiceTable2;


const ProductModal = ({ product, closeModal, isOpen }) => {
    // const { name, price, quantity, shopId, shopName, subtotal, unit, product:{image} } = product
    console.log(product)
    const stopPropagation = (e) => {
        e.stopPropagation();
      };
    return    (
      <div onClick={closeModal}
        className={`absolute inset-0  flex items-center justify-center ${
          isOpen ? 'block' : 'hidden'
        }`}
      >

        <div className="bg-light200 flex flex-col sm:flex-row  rounded-lg shadow-sm" onClick={stopPropagation}>

            <div className="w-96 sm:w-56 h-full bg=white">
             <Image width={150} height={150} className="w-full h-full object-cover hover:scale-110 duration-300" src={product?.product?.image?.original} alt="product image" /> 
            </div>

            <div className="sm:w-96 p-4">
                <div className="">
                    <h3 className="text-xl capitalize font-semibold tracking-tight">
                    {product?.name}
                    </h3>
                    <h5 className="font-medium text-zinc-500">
                        {product?.shopName}
                    </h5>
                </div>

                <p>{truncateText(product?.product?.description, 120)}</p>
        
                <div className="flex items-center justify-between">
                    <div className="flex gap-1 items-center ">
                        <FaStar  className="text-yellow-500 " size={16}/>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-1 pt-1 rounded ">5.0</span>
                    </div>

                    <div className="text-xl flex gap-2 items-center">
                        <button className="text-xl hover:scale-105 duration-300">
                            <FaHeart/>
                        </button>
                    </div>
                </div>


                <div className="flex items-center justify-between">
                
                    <div className=" flex gap-2 items-center">
                        <div className="text-xl font-bold line-through text-zinc-500 ">${product?.product?.discount}</div>
                        <div className="text-3xl font-bold ">${product?.price}</div>
                    </div>
                </div>

            </div>
          {/* <button
            onClick={closeModal}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Close
          </button> */}

        </div>
      </div>
    );
  };