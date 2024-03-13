
import { Oval } from  'react-loader-spinner'

export function PageLoading ({height, width, color}) {

    return (
        <div className="relative">
            <div className="inset-0 w-full h-full flex justify-center items-center">
             <Oval
                height = {height || "60"}
                width = {width || "60"}
                color = {color || "#4fa94d"}
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#4fa94d"
                strokeWidth={3}
                strokeWidthSecondary={3}
            /> 
        </div>
        </div>
       
        ) 
}
