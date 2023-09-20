import { useGlobalState } from '@/context/GlobalStateContext'
import Sidebar from './Sidebar'
import { workspaceLinks } from '../../data/workspaceData'


const Workspace = ({children, navLinks}) => {
    const { showSidebar, setShowSidebar, } = useGlobalState();

  return (

    <section className=" h-screen overflow-auto  ">
        <div className="flex ">
        {/* desktop view */}
            <div className="absolute min-h-screen border- pr-4  hidden md:block " >
                <Sidebar navLinks={navLinks} heading={'WORKSPACE'} list={workspaceLinks} />
            </div>

        {/* on Mobile view */}
           {
            (
                <div className={`transition-transform ease-in-out duration-300 transform ${
                    showSidebar ? 'translate-x-0' : '-translate-x-full'
                  } absolute top-20 inset-x-0 z-20 left-0 w-full flex h-screen md:hidden gap-0`}>
                   <div className="border-r-2 px-4 bg-light200 border-light300 shadow-l">
                   <Sidebar heading={'WORKSPACE'} list={workspaceLinks} onclick={setShowSidebar}/>
                   </div>
                    <div onClick={()=>setShowSidebar(false)} className='h-full w-full' ></div>
                </div>
            ) 
           }

        {/* content */}
            <div className="w-full rounded-xl h-screen overflow-auto md:ml-60 bg-light100  py-12 px-4">
                {children}
            </div>
        </div>


    </section>
  )
}

export default Workspace