import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { addDeliveryCompany } from '@/componentsB2b/Api2'
import { BtnSpinner } from '@/componentsB2b/Loader/Spinner/BtnSpinner'
import { toast } from 'react-toastify'
import { FaRegTimesCircle } from 'react-icons/fa'

const AddDeliveryCompanyBtn = () => {
    const [formData, setFormData] = useState({
        name: '',
        adress: ''
    })
    const [loading, setLoading] = useState('')
    const [action, setAction] = useState('')

    const add = async (e) => {
        e.preventDefault(); 

        try {
          setLoading(true);
          const response = await addDeliveryCompany(formData);
          console.log('addDeliveryCompany =', response);
      
          if (response?.status === 200) {
            console.log('deleivery companies data ===', response?.data);
            toast.success('Added delivery company.');
            // TODO: Notification - notify vendor seller that delivery is assigned
            // TODO: Add to log
          } else {
            console.log('Api Error res===', response);
            toast.error('Action Unsuccessful');
          }
        } catch (error) {
          console.log('delivery companies catch error', error);
          toast.error('Action Unsuccessful');
        } finally {
          setLoading(false);
        }
      };
      

  return (
    <div className='relative w-80'>
        <Button onClick={ ()=>setAction('add')}>Add +</Button>

        {action && <form onSubmit={add} className='absolute z-50 top-12 border right-0 bg-white p-4 shadow-xl rounded-md '>
            <div className='flex justify-end'> <FaRegTimesCircle onClick={()=>setAction('')}/> </div>
            <div className="pb-4">Add a delivery company</div>

            <label htmlFor="">Name</label>
            <Input
                className=''
                type='text'
                name='name w-'
                value={formData?.name}
                onChange={e=>setFormData({...formData, name: e.target.value})}
            />

            <label htmlFor="" className='pt-3'>Address</label>
            <Input
                className=''
                type='text'
                name='adress'
                value={formData?.adress}
                onChange={e=>setFormData({...formData, adress: e.target.value})}
            />

            <div className="pt-4 flex gap-4 items-center ">
                <Button className='bg-gonje-green' type='submit' > {loading ? <BtnSpinner/> : 'Submit'} </Button>
            </div>
        </form >}
    </div >
    
  )
}

export default AddDeliveryCompanyBtn