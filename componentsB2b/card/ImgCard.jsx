import React from 'react'

const ImgCard = ({src, alt}) => {
  return (
     <img src={src} alt={alt} className='w-full h-full object-cover' />
  )
}

export default ImgCard