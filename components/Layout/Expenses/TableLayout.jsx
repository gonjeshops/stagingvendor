import React from 'react'

const TableLayout = ({children, header,}) => {
    const stopPropagation = (e) => {
        e.stopPropagation();
      };
  return (
   
    <div className="overflow-auto customScrollbar">
    <table className="table table- table-pin-rows  table-pin-cols">
      <thead className='bg-light100 text-gray-500'>
          <tr className='border-y  capitalize font-normal  px-8 bg-light100'>
           {
            (header || [1,2,3,4,5,6,7,8])?.map((item, i )=>(
                <th key={i} className={`px-2 py-3 capitalize font-normal text-sm center`} >
                   {item}
              </th>
            ))
           }
           <th className={'bg-white font-medium '}>ACTIONS</th> 
          </tr>
        </thead>

        {
            children
          }

        <tfoot className='bg-white text-gray-500'>
          <tr className='border-y  capitalize font-normal  px-8 bg-light100'>
            {
              (header || [1,2,3,4,5,6,7,8])?.map((item, i )=>(
                  <th key={i} className={`px-2 py-3 capitalize font-normal text-sm center`} >
                    {item}
                </th>
              ))
            }
           <th className={'bg-white font-medium '}>ACTIONS</th> 
          </tr>
        </tfoot>
                  
        
      </table>   
    </div>  
 
  )
}

export default TableLayout