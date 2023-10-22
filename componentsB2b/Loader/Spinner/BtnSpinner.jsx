
import { TailSpin } from  'react-loader-spinner'

export function BtnSpinner ({height, width, radius, color}) {

    return (
        <div className="relative">
            <div className="inset-0 w-full h-full flex justify-center items-center">
             <TailSpin
            height = {height || "16"}
            width = {width || "16"}
            radius = {radius || "1"}
            color = {color || "white"}
            ariaLabel="tail-spin-loading"    
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        /> 
        </div>
        </div>
       
        ) 
}
