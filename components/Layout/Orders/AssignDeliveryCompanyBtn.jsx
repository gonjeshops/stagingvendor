import Select from 'react-select';
import { useEffect, useState } from 'react'
import { useGlobalState } from '@/context/GlobalStateContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { assignDeliveryCompanyCustomer, fetchDeliveryCompanies } from '@/componentsB2b/Api2';
import { FaTimes } from 'react-icons/fa';
import { triggerNotification } from '@/configs/pusherConfig';


const AssignDeliveryCompanyBtn = ({item,path,setRefresh }) => {
    const router = useRouter();

    const {user} = useGlobalState()
    const [isLoading, setIsLoading] = useState('');
    const [action, setAction] = useState('')
    const [select, setSelect] = useState('')
    const [deliveryCompanies, setDeliveryCompanies] = useState([])
    const [orderId, setOrderId] = useState('')


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchDeliveryCompanies()
                console.log('deleivery companies', res)
                if (res?.status === 200) {
                    const options = res?.data?.data?.data?.map(({company_name,id}) => {
                        return {
                          value: {
                            name: company_name,
                            id: id
                          },
                          label: company_name
                        }
                      })
                    setDeliveryCompanies(options)
                  }else {
                    console.log('Api Error res===', res);
                  }
            } catch (error) {
                console.log('deleivery companies catch error', error)
            } 
        }
        fetchData()
    }, [])

    // assign data
    const assignDelivery = async (selected) => {
        try {
            setIsLoading('assign')
            const res = await assignDeliveryCompanyCustomer(selected?.value, item?.id)
            if (res?.status === 200) {
                toast.success('Delivery company assigned')
                triggerNotification(user?.shop_id, {
                    title: 'Assigned delivery company',
                    message: `Delivery company has been assigned to the order ${item?.id}`,
                    status: 0,
                })
                }else {
                console.log('assignDeliveryCompany Api Error res===', res);
                toast.error('Action Unsuccessfull')
                }
        } catch (error) {
            console.log('assignDeliveryCompany catch error', error)
            toast.error('Action Unsuccessfull')
        }finally {
            setIsLoading('')
            setAction('')
        }
    }

    const handleSelect = (selected) => {
        setSelect(selected);
        assignDelivery(selected)
    };

    const DropdownMenu = () => {
        return (
            <div onClick={e=>e.stopPropagation()} className={`relative p-12 rounded-lg bg-light100 border shadow-md `}>
                <FaTimes className='absolute top-6 right-6' onClick={()=>setAction('')}/>
                <p className="text-lg pb-4 ">Select a delivery company</p>
                {isLoading && <p className='pb-2'>Updating...</p>}
                <Select
                    value={select}
                    onChange={handleSelect}
                    options={deliveryCompanies}
                    className="w-80 bg-light100  text-black focus:outline-none focus:ring focus:border-green-300"
                    placeholder="Filter with Order Status"
                />   
            </div>
        )
    }
    
  return (
    <div className=''> 
   
                <div className={`${action===item?.id ? 'z-1000  relative ' : ''} flex gap-2  px-2 text-sm text-center `} >
                    {/*  received quote/invoice - outgoing order - seller - supplier api*/}
                    
                    <button 
                        onClick={()=>{
                            setAction(prev=> prev===item?.id ? '' : item?.id)
                            setOrderId(item?.id)
                        }}
                        disabled={item?.status==='COMPLETED'}  
                        className={ `${item?.status==='COMPLETED' ? 'disable  ' : 'hover-blue '} btn btn-primary w-20   text-center rounded` }>
                            {action ? 'Close' : 'Assign'}
                    </button>

                    {action===item?.id && <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-black " onClick={()=>setAction('')} ><DropdownMenu/></div>}
                </div>
    </div>
  )
}

export default AssignDeliveryCompanyBtn
