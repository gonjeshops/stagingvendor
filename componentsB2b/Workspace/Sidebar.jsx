import {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link';
import { useGlobalState } from '@/context/GlobalStateContext';
import OtherWorkspaceLinks from './OtherWorkspaceLinks';
useGlobalState
import { MdArrowCircleDown, MdArrowCircleUp } from 'react-icons/md';


const Sidebar = ({heading, onclick, list}) => {

    const router = useRouter()
    const [active, setActive] = useState(router.pathname.split('/')[2])
    const [notification, setNotification] = useState(true)
    const { module, fetchUser, modalType, openModal, setShowSidebar, setOpenNavSubmenu, openNavSubmenu} = useGlobalState()
   
    const handleClick = (title, link) => {
        setActive(title)
        router.push(link)
        setShowSidebar(false)
        setOpenNavSubmenu(false)
        // onclick(false)
    }

    const toggleSubMenu = (index) => {
        setOpenNavSubmenu((prevOpenSubmenu) =>
          prevOpenSubmenu === index ? null : index
        );
        
      };
    

  return (
    <div className="w-64 md:w-56 py-8 ">
        {modalType==='vendor' && <div className="flex space-x-3 pb-4">
            <div className="text-2xl cursor-pointer" onClick={()=>openModal('cartegory')}>
              {
                modalType==='cartegory' ? (<MdArrowCircleUp/>) : (<MdArrowCircleDown/>)
              }
            </div>
            
            <div className="text-base "> Supplier Category</div>
        </div> }

        <h3 className=" text-base pb-2">
            {heading}
        </h3>
        <div className="space-y-">
            {
                list?.map((item, index)=> {
                    const {titel, icon, link} = item
                    
                    return(

                    <div key={item.title}  className=" rounded-l-full hover:bg-light100 duration-300">
                        { item.submenu ?

                        // navlink that has a sublink
                        <div className=""
                            onClick={()=> toggleSubMenu(index)}
                        >
                            <div 
                            // onClick={()=>handleClick(title, link)}
                            className={`w-full cursor-pointer px-10 py-3 rounded flex gap-2 bg-hover300 ${active=== item.title ? 'bg-light300 text' : null}  
                            relative`
                            }>
                                <p className="text-2xl">{item.icon}</p>
                                <p className='capitalize'>{item.title}
                                </p>
                                <span className={`transform transition-transform ease-in ${
                                    openNavSubmenu === index ? 'rotate-180' : ''
                                } group-hover:rotate-180`}>
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                    >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </span>
                                {notification && <div className='absolute top-2 right-24 bg-blue-400 rounded-full h-2 w-2'></div>}
                        </div>
                        </div> 
                        
                        :
                        // navlink that has no sublink.
                        <div 
                            onClick={()=>handleClick(item.title, item.link)}
                            className={`w-full cursor-pointer px-10 py-3 rounded flex gap-2 bg-hover300 ${active=== item.title ? 'bg-light300 text-darkt300' : null}`  }>
                                <p className="text-2xl">{item.icon}</p>
                                <p className='capitalize'>{item.title}</p>
                        </div> 
                        
                        }

                        {/* rendering sublink */}
                        {item.submenu && openNavSubmenu === index && (
                        <ul className="pl-4 space-y-1">
                        {item.submenu.map(({link, title, path}, subIndex) => (
                            <li
                            key={subIndex}
                            className="flex pl-6 "
                            >
                            <Link href={link} 
                            onClick={()=>setShowSidebar(false)}
                            className={`py-2 pl-2 rounded bg-hover300  ${active=== path ? 'bg-light300 text-dark300' : null} `}>
                                <div className="flex gap-2 items-center">
                                    <p className='w-full'>{title} </p>
                                    {notification && <div className="bg-blue-200 text-[8px] flex-shrink text-zinc-700 text-sm rounded-full px-1">New
                                        
                                    </div>}
                                </div>
                            </Link>
                            </li>
                        ))}
                        </ul>
                    )}


                    </div>
                )})
            }

  

        </div>

        {module.moduleType === 'vendor' && <OtherWorkspaceLinks active={active} handleClick={handleClick} moduleType={module.moduleType}  fetchUser={fetchUser} setShowSidebar={setShowSidebar}/>}
        
        <div className='gap-4 grid'>
             <Link href={'/dashboard'} className='hover-blue py-3 text-center  rounded '
              >
                    B2C Dashboard             
                </Link>
        </div>
        
        
        
        
    </div>
  )
}

export default Sidebar