import Link from 'next/link'



const BtnOutline = ({color,children, link}) => {
    return (
        <Link href={link} 
        className={`rounded-full  border border-orange-500 font-medium px-8 py-3 text-lg hover:scale-105 duration-300`}>
         {children} 
        </Link>
      )
    }
    
export default BtnOutline