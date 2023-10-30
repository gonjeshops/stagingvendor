import { useRouter } from 'next/router'
import React from 'react'

const NotificationCard = ({item}) => {
    const router = useRouter()
  return (
    <div 
    onClick={()=>router.push('/vendorb2b/notifications')}
    className='flex gap-4 items-center border-b pb-2 hover:bg-blue-400 duration-300'>
        <div className="h-10 rounded-full w-10 overflow-hidden flex justify-center items-center bg-light300">
            {item?.title[0]}

        </div>
        <div className="spa">
            <h4 className='text-2xl font-medium text-zinc-500'>{item?.title}</h4>
            <p className='text-sm'>{item?.message}</p>
            <p className='text-sm'>{new Date(item?.created_at).toDateString()}</p>
        </div>
    </div>
  )
}

export default NotificationCard