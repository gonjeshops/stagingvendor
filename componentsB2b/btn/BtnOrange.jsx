import Link from 'next/link'



const BtnOrange = ({color,children, link}) => {
    return (
 
     
           <Link href={link} 
        className={`rounded-full bg-orange-600 text-white font-medium px-8 py-3 text-lg hover:scale-105 duration-300`}>
         {children} 
        </Link>
        
  
      )
    }
    
export default BtnOrange