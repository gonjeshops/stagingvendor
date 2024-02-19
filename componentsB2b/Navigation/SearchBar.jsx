import { FiSearch } from "react-icons/fi"


const SearchBar = ({onFocus}) => {
  return (
    <div className="max-w-[500px] border m-auto bg-light100 shadow-sm rounded-full py-2 px-4 flex items-center space-x-1 ">
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