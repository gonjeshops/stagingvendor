
import { useRouter } from 'next/router';
import { Button } from '../ui/button';


const Tabs = ({navs, }) => {
    const router = useRouter()
    
  return (

    <div className={`max-w-3xl mx-auto grid gap-2 sm:flex `}>
        {
            navs?.map(({title,type, link},i)=>(
                <Button key={i} 
                onClick={()=>router.push(link)} 
                className={`${type ? 'h-20' : 'h-16' }  text-base text-black  px-4 hover:shadow-lg duration-300   w-full text-center ${router.pathname.includes(link) ? 'bg-gonje-green text-white' : 'bg-white rounded'}`}
                >
                   <div> {title}
                    <p className='text-[10px]'>{type}</p>
                    </div>
                </Button>
            ))
        }        
    </div>
    
  )
}

export default Tabs