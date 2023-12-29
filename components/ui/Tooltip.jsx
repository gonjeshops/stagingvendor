import React from 'react'

const Tooltip = ({children, tooltiptext, callback, isTooltip}) => {
  return (
    <div 
    // onClick={()=>callback()} 
    className={`tooltip tooltip-open tooltip-error`} data-tip={'tooltiptext'}>
        {children}
    </div>
  )
}

export default Tooltip