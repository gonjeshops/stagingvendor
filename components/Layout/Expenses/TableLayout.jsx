import React from 'react'

const TableLayout = ({children, header,}) => {
    const stopPropagation = (e) => {
        e.stopPropagation();
      };
  return (
    <div className="overflow-x-auto lg:overflow-visible">
      <table className="w-full table-auto ">
        <thead>
          <tr className='border-y  capitalize font-normal  px-4'>
           {
            (header || [1,2,3,4,5,6,7,8])?.map((item, i )=>(
                <th key={i} className={`px-2 py-3 capitalize font-normal text-sm center`} >
                   {item}
              </th>
            ))
           }
          </tr>
        </thead>

        <tbody className='text-sm'>
          {
            children
          }        
        </tbody>
      </table>     
    </div>
  )
}

export default TableLayout