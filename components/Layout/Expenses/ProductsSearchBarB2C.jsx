import { Input } from '@/components/ui/input';
import { fetchB2cShops } from '@/componentsB2b/Api2';
import {useEffect, useState} from 'react'
import { FaSearch } from 'react-icons/fa';
import Select from 'react-select';


const ProductsSearchBarB2C = ({setSearch, setShop }) => {
    const [input, setInput] = useState('') 
    const [shopName, setShopName] = useState('');
    const [shoplist, setShoplist] = useState([])
    const [categoryList, setCategoryList] = useState('');
    const [category, setCategory] = useState('');


    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetchB2cShops(1,1000, '')
          console.log('shops', res)
          if (res.status===200){
              const shops = res?.data?.data?.data?.map(({name, id, owner_id}) => {
                return {
                  value: {
                    userId: owner_id,
                    shopId: id
                  },
                  label: name
                }
              })
              const categories = res?.data?.data?.data?.map(({ id, slug, category}) => {
                return {
                  value: {
                    shopId: id,
                    slug: slug,
                    category: category,
                  },
                  label: slug
                }
              })
            // console.log('LIST==',shops, categories)
            setShoplist(shops)
            setCategoryList(categories)
          } else {
            console.log('Error fetching shops:', res)
          }
        } catch (error) {
          console.log('fetchB2cShops catch error:', error)
        }
      }
      fetchData()
    }, [])
    

    const handleShopName = (selected) => {
      setShopName(selected);
      setSearch(selected?.value)
      setShop(selected?.label)
    };

    const handleCategory = (selected) => {
      setCategory(selected);
    };
  

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(input)
    }


  return (
    <form onSubmit={handleSubmit} className='py-2 w-full flex  justify-between gap-4 flex-wrap' >

        <div className="relative   flex gap-1 ">
            <Input type="text" name="supplierSearch" id="supplierSearch" 
                className='w-80 px-3 py-3 '
                placeholder='Search order listing'
                value={input}
                onChange={(e)=>setInput(e.target.value)}
            />
            <button onClick={()=>setSearch(input)}
            className='px-3 bg-gonje-green rounded-md text-white '><FaSearch/></button>
        </div>


       
          <Select
              value={shopName}
              onChange={handleShopName}
              options={shoplist || []}
              className="w-80 bg-light100  text-black focus:outline-none focus:ring focus:border-green-300"
              placeholder="Search shop name"
            />

            <Select
            value={category}
            onChange={handleCategory}
            options={categoryList || []}
            className="w-80 bg-light100  text-black focus:outline-none focus:ring focus:border-green-300"
            placeholder="Search product category"
            // isMulti
          />

    </form>
  )
}

export default ProductsSearchBarB2C