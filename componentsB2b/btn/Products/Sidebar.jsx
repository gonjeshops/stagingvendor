import React from 'react'

const Sidebar = ({heading, list}) => {
    
  return (
    <div className="w-52 py-8">
        <h3 className="font-semibold text-3xl pb-8">
            {heading}
        </h3>
        <div className="space-y-2">
            {
                list.map((items, i)=>(
                    <p key={i}>
                        {items}
                    </p>
                ))
            }
        </div>
    </div>
  )
}

export default Sidebar