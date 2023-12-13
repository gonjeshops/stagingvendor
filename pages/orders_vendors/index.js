import { PageLoading } from '@/componentsB2b/Loader/Spinner/PageLoading'
import { useRouter } from 'next/router'
import React from 'react'

const index = () => {
    const {push} = useRouter()
    push('/order_vendor/incoming')
  return (
    <div className='absolute inset-0 flex justify-center items-center'>
        <PageLoading/>
    </div>
  )
}

export default index