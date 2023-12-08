import {useState} from 'react';
import { FaEnvelope, FaAngleDown, FaImage, FaStar, FaHeart, FaTimes, FaStore } from 'react-icons/fa';
import ImgCard from '../card/ImgCard';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { truncateText } from '@/lib/truncateText';

const InvoiceTable2 = ({data, invoices, tableHeader}) => {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

    const router = useRouter()
    console.log('INVOICE====', invoices)

    const [selectedOption, setSelectedOption] = useState('');

    const handleRadioBtn = (event) => {
        const newValue = event.target.value;
        setSelectedOption((prevValue) => (prevValue === newValue ? '' : newValue)); 
    };

    const handleChange= () => {}

    // displaying product
    const [selectedProduct, setSelectedProduct] = useState(invoices[0]);
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
            invoices?.map((item, ) => {
             return ( <tr key={item?.id} className='border-b   border-light300 bg-hover300  duration-300' 
            onClick={()=>router.push(`/vendorb2b/workspace/invoices/${item?.id}`)} 
            >
   

              <td className="px-2 py-4 cursor-pointer">
                <p className="text-">{item?.id}</p>
              </td>

              <td className="px-2 cursor-pointer">
                <p className="text-">INV{item?.id}</p>
              </td>

              <td className="px-2 cursor-pointer">
                <p className="text-">{item?.quote_name}</p>
              </td>

              <td className="px-2 cursor-pointer">
                <p className="text-">{item?.shop_name}</p>
              </td>

              <td className="px-2 cursor-pointer">
                <p className="text-">{item?.user_name}</p>
                {/* <p className="text-">{JSON.parse(item?.cart_items) && JSON.parse(item?.cart_items)[0]?.userName}</p> */}
              </td>
              <td className="px-2  " >
                <div className="flex gap-2 items-center flex-wrap">
                    {JSON.parse(item?.cart_items)?.map((product, idx) => (
                        <div key={idx} className="shrink-0" onClick={stopPropagation}>
                        <p  className="text-blue-500 hover:underline cursor-pointer"  onClick={() => openModal(product)} >
                            {product?.name}{idx !== JSON.parse(item?.cart_items)?.length - 1 && <span>, </span>}
                        </p>
                        {isModalOpen && <ProductModal isOpen={isModalOpen} closeModal={closeModal} product={selectedProduct} />
                        }
                        </div>
                    ))}
                </div>

              </td>

              <td className='px-2 cursor-pointer'>
                ${item?.subtotal}
              </td>

              <td className='px-2 cursor-pointer uppercase'>
                {item?.status}
              </td>
              <td className='px-2 cursor-pointer'>
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
    const stopPropagation = (e) => {
        e.stopPropagation();
      };
    return    (
      <div onClick={closeModal}
        className={`absolute inset-0  flex items-center justify-center  ${
          isOpen ? 'block' : 'hidden'
        }`}
      >

        <div className="relative bg-light200 w-96 md:w-[550px] flex flex-col sm:flex-row  rounded-lg  shadow-xl overflow-hidden" onClick={stopPropagation}>

            <div className="w-full md:w-2/5 h-60 md:h-full overflow-hidden">
             <Image width={150} height={150} className="w-full h-full object-cover hover:scale-105 duration-300" src={product?.product?.image?.original} alt="product image" /> 
            </div>

            <div className="w-full md:w-3/5 space-y-3 p-3">
                <div className="">
                    <h3 className="text-lg capitalize font-medium tracking-tight">
                    {product?.name}
                    </h3>
                    <h5 className="font-medium text-zinc-500 flex gap-2 items-center">
                        <FaStore/>{product?.shopName}
                    </h5>
                </div>

                <p>{truncateText(product?.product?.description, 120)}</p>
        
                <div className="flex items-center justify-between">
                    <div className="flex gap-1 items-center ">
                        <FaStar  className="text-yellow-500 " size={16}/>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-1 pt-1 rounded ">5.0</span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                
                    <div className=" flex gap-2 items-center">
                        <div className="text-xl font-bold line-through text-zinc-500 ">${product?.product?.discount}</div>
                        <div className="text-3xl font-bold ">${product?.price}</div>
                    </div>
                </div>
            </div>
          <button
            onClick={closeModal}
            className="absolute right-2 top-2 z-10 p-2 hover-blue rounded-full "
          >
            <FaTimes/>
          </button>

        </div>
      </div>
    );
  };

