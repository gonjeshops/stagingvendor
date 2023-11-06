import {useState} from 'react';
import { FaEnvelope, FaAngleDown, FaImage, FaStar, FaHeart, FaTimes, FaStore } from 'react-icons/fa';
import ImgCard from '../card/ImgCard';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { truncateText } from '@/lib/truncateText';

const InvoiceTable2 = ({data, invoicess, tableHeader}) => {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

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
              console.log('ITEMS', item)
             return ( <tr key={item?.id} className='border-b   border-light300 bg-hover300  duration-300' 
            onClick={()=>router.push(`/vendorb2b/workspace/invoices/${item?.id}`)} 
            >
              <td className="pl-2 py-4 text-start w-10" onClick={stopPropagation}>
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

              <td className="px-2 cursor-pointer">
                <p className="text-">{item?.id}</p>
              </td>

              <td className="px-2 cursor-pointer">
                <p className="text-">{item?.id}</p>
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
              <td className="px-2  " onClick={stopPropagation}>
                <div className="flex gap-2 items-center flex-wrap">
                    {JSON.parse(item?.cart_items)?.map((product, idx) => (
                        <div key={idx} className="shrink-0">
                        <p className="text-blue-500 hover:underline cursor-pointer"  onClick={() => openModal(product)} >
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

        <div className="bg-light200 w-96 md:w-[550px] flex flex-col sm:flex-row  rounded-lg shadow-sm" onClick={stopPropagation}>

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

  "[{\"quantity\":4,\"price\":120,\"id\":107,\"name\":\"Armani Silver Purse\",\"inStock\":1,\"shopId\":3,\"unit\":\"kg\",\"subtotal\":360,\"product\":{\"id\":107,\"name\":\"Armani Silver Purse\",\"slug\":\"armani-silver-purse\",\"description\":\"The name Giorgio Armani has become synonymous with clean lines and Italian style. One of the most recognisable fashion houses in the world, the label has dressed some of the world\\u2019s most beautiful women.\",\"category\":null,\"type_id\":4,\"price\":120,\"shop_id\":3,\"shop_name\":\"My Shop\",\"sale_price\":null,\"sku\":\"2006\",\"quantity\":49,\"in_stock\":1,\"is_taxable\":0,\"shipping_class_id\":null,\"status\":\"publish\",\"product_type\":\"simple\",\"unit\":\"kg\",\"height\":null,\"width\":null,\"length\":null,\"product_image\":null,\"image\":{\"id\":\"108\",\"original\":\"https:\\/\\/pickbazarlaravel.s3.ap-southeast-1.amazonaws.com\\/108\\/91PirQjxGjL._UL1500_.jpg\",\"thumbnail\":\"https:\\/\\/pickbazarlaravel.s3.ap-southeast-1.amazonaws.com\\/108\\/conversions\\/91PirQjxGjL._UL1500_-thumbnail.jpg\"},\"gallery\":[],\"deleted_at\":null,\"created_at\":\"2021-03-09T17:40:49.000000Z\",\"updated_at\":\"2022-01-17T09:10:37.000000Z\",\"max_price\":0,\"min_price\":0,\"nutritional_info\":\"Lorem Ipsum is simply dummy text of the printing and typesetting industry.\",\"top_deals\":0,\"discount\":0},\"userName\":\"undefined undefined\",\"shopName\":\"My Shop\"}]"