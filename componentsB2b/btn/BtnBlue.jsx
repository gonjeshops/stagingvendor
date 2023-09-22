import Link from 'next/link'


const BtnBlue = ({text, link}) => {
  return (
    
      <Link href={link} 
    className=' rounded-lg bg-blue-600 text-white font-semibold px-8 py-4 text-lg'>
     {text}
    </Link>
   
  )
}

export default BtnBlue