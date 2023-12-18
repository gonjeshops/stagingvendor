import { Button } from '@/components/ui/button'
import Select from 'react-select';
import { useEffect, useState } from 'react'
import { useGlobalState } from '@/context/GlobalStateContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { assignDeliveryCompany, fetchDeliveryCompanies } from '@/componentsB2b/Api2';
import { data } from 'autoprefixer';
import { FaTimes } from 'react-icons/fa';


const AssignDeliveryCompanyBtn = ({item,path,setRefresh }) => {

    const router = useRouter();

    const {user} = useGlobalState()
    const [isLoading, setIsLoading] = useState('');
    const [action, setAction] = useState('')
    const [select, setSelect] = useState('')
    const [deliveryCompanies, setDeliveryCompanies] = useState([])
    const [orderId, setOrderId] = useState('')

    // fetch delivery companies
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
            console.log('selected', selected,  '==select', select, "orderId", orderId)
            const res = await assignDeliveryCompany(selected?.value, orderId)
            console.log('assignDeliveryCompany', res)
            if (res?.status === 200) {
                console.log('assignDeliveryCompany data ===', res?.data);
                setRefresh(prev=>!prev)
                toast.success('Delivery company assigned')
                // TODO: Notification - notify vendor buyer that delivery is assigned
                // TODO: Add to log 
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
            <div onClick={e=>e.stopPropagation()} className={`relative p-10 rounded-lg bg-light100 border shadow-md `}>
                <FaTimes className='absolute top-8 right-8' onClick={()=>setAction('')}/>
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
                    
                    <Button 
                        onClick={()=>{
                            setAction(prev=> prev===item?.id ? '' : item?.id)
                            setOrderId(item?.id)
                        }}
                        disabled={item?.status==='COMPLETED'}  
                        className={ `${item?.status==='COMPLETED' ? 'disable  ' : 'hover-blue text-white'} w-20 px-2  text-center py-2 rounded` }>
                            {action ? 'Close' : 'Assign'}
                    </Button>

                    {action===item?.id && <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-black " onClick={()=>setAction('')} ><DropdownMenu/></div>}

                </div>
            
    </div>
  )
}

export default AssignDeliveryCompanyBtn
