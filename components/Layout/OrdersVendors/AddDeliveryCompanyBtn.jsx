import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { addDeliveryCompany } from '@/componentsB2b/Api2'
import { BtnSpinner } from '@/componentsB2b/Loader/Spinner/BtnSpinner'
import { toast } from 'react-toastify'
import { FaRegTimesCircle } from 'react-icons/fa'

const AddDeliveryCompanyBtn = ({setRefresh}) => {
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
          if (response?.status === 200) {
            toast.success('Added delivery company.');
            setAction('')
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
        <Button onClick={ ()=>setAction('add')} className='w-40 text-center'>Add +</Button>

        {action && <form onSubmit={add} className='absolute z-50 top-12 border left-0 w-80 bg-white p-4 shadow-xl rounded-md '>
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
                <Button className='bg-gonje-green w-40 text-center' type='submit' > {loading ? <BtnSpinner/> : 'Submit'} </Button>
            </div>
        </form >}
    </div >
    
  )
}

export default AddDeliveryCompanyBtn