import React from 'react'
import DashboardHeading from './DashboardHeading'
import SearchBar from '../Navigation/SearchBar'
import {BsChatFill} from 'react-icons/bs'

const Help = () => {
  return (
    <div className='space-y-8'>
        <DashboardHeading>
            Help
        </DashboardHeading>




        <div>
        <div className="font-semibold pb-4">How can we healp?</div>
            <p className='pb-4'> Search for the topic you need or <span className='text-blue-600'> <a href="mailto:support@gonje.com.au">contact our support team</a> </span></p>
            <SearchBar/>
        </div>

        

        <div>
        <div className="mt-10 border-y py-6 ">
            <h4 className="font-semibold pb-3">What's your return policy?</h4>
            <p className=' max-w-[700px]' >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas culpa iure natus fugiat. Cupiditate odit minus explicabo omnis, voluptate enim sapiente officia dolores odio sunt unde voluptatibus cum illo totam! Dolores ad eum neque quia amet, odio nisi debitis laborum?</p>
        </div>
        {
            [1,2,3,4,5,].map((item, i)=>(
                <div className="text-blue-600 py-4  border-y font-semibold">
                    How do I cancel my order
                </div>
            ))
        }
        </div>

        <div className="flex-col py-10 gap-2 justify-center text-center">
            <h3 className='font-semibold text-3xl'>Still cant't find an answer?</h3>
            <p className="text-lg">
                We are happy to help
            </p>
            <div className="flex w-full mt-4 justify-center">
            <button className='border rounded-md border-blue-600 text-blue-600 px-6 py-2 flex items-center gap-3'> <BsChatFill/> Chat with us</button>
            </div>

           


        </div>


    </div>
  )
}

export default Help