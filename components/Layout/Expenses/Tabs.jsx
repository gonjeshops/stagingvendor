
import { useRouter } from 'next/router';


const Tabs = ({navs, }) => {
    const router = useRouter()
    
  return (

    <div className={`max-w-3xl mx-auto rounded-lg grid gap-2 sm:flex`}>
        {
            navs?.map(({title, link},i)=>(
                <button key={i} 
                onClick={()=>router.push(link)} 
                className={`h-16 rounded-md  px-4 hover:shadow-lg duration-300   w-full text-center ${router.pathname.includes(link) ? 'bg-gonje-green text-white' : 'bg-white rounded'}`}
                >
                    {title}
                </button>
            ))
        }        
    </div>
    
  )
}

export default Tabs