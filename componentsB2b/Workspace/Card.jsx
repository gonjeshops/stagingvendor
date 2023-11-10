import React from 'react'

const Card = ({data, iconColor, titleBold, titleColor}) => {
  return (
    <div className='grid rounded-lg bg-light200 justify-center items-center p-8 text-center'>
        <div className={`text-4xl pb-3 flex justify-center ${iconColor}`}>
            {data.icon}
        </div>
        <h3 className={`font-semibold text-3xl pb- `}>{data.data}</h3>
        <p className={`${titleBold} ${titleColor }`}>{data.title}</p>
    </div>
  )
}
export default Card