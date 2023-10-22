import {useState} from 'react'

const Navigate = ({product}) => {
    const [active, setActive] = useState(0)
    
  return (
    <div className='pb-80'>
        <div className="flex gap-10 pb-8 ">
            {
                ['Description', 'Specification', `Rating & Review`]?.map((item, i) => (
                    <div onClick={()=>setActive(i)} 
                     key={item} className={`${i===active ? 'border-blue-600 border-b-2' : '' } py-2 hover:border-b-2 hover:border-blue-600 duration-300 cursor-pointer`}>
                        {item }
                        
                    </div>
                ))
            }
        </div>

        <div className='md:w-[700px]'>
            {
               [product?.description,

                `Accusantium quidem in dolores repellat, dolorum nesciunt at, inventore dolore perferendis sapiente et. Quos illum eum doloribus quidem delectus aperiam magni maxime, quaerat, quasi earum quam nam Ex architecto quisquam, perferendis dignissimos natus fuga! Corporis, ullam soluta! Mollitia laudantium, reiciendis suscipit hic quasi eligendi voluptates laborum voluptatum laboriosam perspiciatis cum dolores, pariatur culpa.`,


                `Mollitia laudantium, reiciendis suscipit hic quasi eligendi voluptates laborum voluptatum laboriosam perspiciatis cum dolores, pariatur culpa.
                Mollitia laudantium, reiciendis suscipit hic quasi eligendi voluptates laborum voluptatum laboriosam perspiciatis cum dolores, pariatur culpa.
                Mollitia laudantium, reiciendis suscipit hic quasi eligendi voluptates laborum voluptatum laboriosam perspiciatis cum dolores, pariatur culpa.`][active]


            }
        </div>
    </div>
  )
}

export default Navigate