import { FiSearch } from "react-icons/fi"


const SearchBar = ({onFocus}) => {
  return (
    <div className="max-w-[500px] m-auto bg-light100 shadow rounded-full py-2 px-3 flex items-center space-x-3 ">
    <div>
      <FiSearch width={20}/>
    </div>
    <div className="w-full">
      <input type="text" 
      className='w-full h-full bg-light100 ' 
      placeholder='Search' 
      onFocus={onFocus}
      />
    </div>
  </div>
  )
}

export default SearchBar