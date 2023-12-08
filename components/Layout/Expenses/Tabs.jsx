import { Link } from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router';


const Tabs = () => {
    const router = useRouter()
    
    const [active, setActive] = useState('products')
    const tabs = [
        {title: 'Product List', link: 'products'}, 
        {title: 'Received Quotes', link: 'received_quotes'}, 
        {title: 'Sent Quotes', link: 'sent_quotes'}, 
    ]
  return (

    <div className='max-w-3xl mx-auto   rounded-lg grid gap-2 sm:grid-cols-3 sm:gap-0'>
        {
            tabs?.map(({title, link},i)=>(
                <button key={i} 
                onClick={()=>router.push(link)} 
                className={`h-16 flex items-center px-4 hover:shadow-lg duration-300   w-full text-center ${router.pathname.includes(link) ? 'bg-gonje-green text-white' : 'bg-white rounded'}`}
                >
                    {title}
                </button>
            ))
        }        
    </div>
    
  )
}

export default Tabs