import { useState } from 'react';
import { BtnSpinner } from '@/componentsB2b/Loader/Spinner/BtnSpinner';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { currency } from '@/lib/currency';
import OrderTableRowActions from './OrderTableRowActions';

const OrderTableRow = ({data,path, setRefresh}) => {
    const router = useRouter()

    const renderImageCell = (item) => {
        const products = JSON.parse(item.cart_items);
        return (
            <td className="px-2 space-y-2 h-full">
            {products.map((product, i)=><div key={i} className="flex gap-2 text-[10px] items-center">
                <div className="h-10 w-10 shrink-0 overflow-hidden border rounded">
                <img src={product.product.image.thumbnail} alt={item.id} className="object-cover w-full h-full" />
                </div>
                <p className="text-sm">{product.product.name}</p>
            </div>)}
            </td>
        );
    };
    
    const renderTextCell = (text) => (
        <td className="px-3 py-3">
            <p className="text-">{text}</p>
        </td>
    );

    const renderNameCell = ({user_name}) => (
        <td className="px-2  ">
            <div className="flex gap-2 items-center">
                <div className="overflow-hidden h-6 w-6 rounded-full flex-shrink-0 bg-green-200">
                    <h4 className='flex items-center w-full h-full justify-center text-sm font-bold text-gonje-green'>{user_name[0]}</h4>
                </div>
                <p className="">{user_name}</p>
            </div>
        </td>
    )

    const [loading, setIsLoading] = useState(false);

    const addressLine = (item) => {
        const address = JSON.parse(item?.shipping_details)
        return `${address?.apt ?? ''}${address?.apt ? ', ' : ''}${address?.address ?? ''}, ${address?.city ?? ''}, ${address?.state ?? ''}, ${address?.postcode ?? ''}`;
    };

    return (
    <tbody className='text-sm '>
        {data?.map((item, i) => (
        <tr key={item?.id} className=" px-6  border-b border-light300 bg-hover300 duration-300">
            {renderTextCell('ORDER'+item?.id)}
            {renderTextCell(currency() + item?.subtotal)}
            {renderTextCell(item?.user_name)}
            {renderImageCell(item)}
            {renderTextCell(item?.order_status)}
            {renderTextCell(new Date(item?.created_at).toDateString())}
            {renderTextCell(item?.tracking_number)}
            {renderTextCell(item?.consignment_number)}
            {renderTextCell(item?.delivery_company_name)}
            {renderTextCell(item?.quote_name)}
            {renderTextCell(item?.shop_name)}
            {renderTextCell(addressLine(item))}

            <th className="  bg-white p-2 pt- text-sm z-30">
                <OrderTableRowActions item={item} path={path} setRefresh={setRefresh} />
            </th>
        </tr>
        ))}
    </tbody>
    );
};
    
export default OrderTableRow