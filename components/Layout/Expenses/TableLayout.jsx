import React from 'react'

const TableLayout = ({children, header,}) => {
    const stopPropagation = (e) => {
        e.stopPropagation();
      };
  return (
    <div className="overflow-x-scroll lg:overflow-visible">
      <table className="w-full table-auto ">
        <thead>
          <tr className='border-b bg-yellow-300'>
           {
            (header || [1,2,3,4,5,6,7,8])?.map((item, i )=>(
                <th key={i} className={`px-2 py-4 center`} >
                   {item}
              </th>
            ))
           }
          </tr>
        </thead>

        <tbody>
          {
            children
          }        
        </tbody>
      </table>     
    </div>
  )
}

export default TableLayout