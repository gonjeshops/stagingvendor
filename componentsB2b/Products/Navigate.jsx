
import SimilarProducts from './SimilarProducts'
import { useGlobalState } from '@/context/GlobalStateContext'

const Navigate = ({product}) => {
    const {active, setActive} = useGlobalState()

  return (
    <div className='pb-80'>
        <div className="flex gap-10 pb-8 ">
            {
                ['Description', 'Products The Same Shop', `Rating & Review`]?.map((item, i) => (
                    <div onClick={()=>setActive(i)} 
                     key={item} className={`${i===active ? 'border-blue-600 border-b-2' : '' } py-2 hover:border-b-2 hover:border-blue-600 duration-300 cursor-pointer`}>
                        {item }
                        
                    </div>
                ))
            }
        </div>

        <div className='w-full'>
            {
               [
                <div className='md:w-[700px]'>
                    {product?.description}
                </div>
                ,

               <SimilarProducts/>
                ,

                `Mollitia laudantium, reiciendis suscipit hic quasi eligendi voluptates laborum voluptatum laboriosam perspiciatis cum dolores, pariatur culpa.
                Mollitia laudantium, reiciendis suscipit hic quasi eligendi voluptates laborum voluptatum laboriosam perspiciatis cum dolores, pariatur culpa.
                Mollitia laudantium, reiciendis suscipit hic quasi eligendi voluptates laborum voluptatum laboriosam perspiciatis cum dolores, pariatur culpa.`][active]


            }
        </div>
    </div>
  )
}

export default Navigate