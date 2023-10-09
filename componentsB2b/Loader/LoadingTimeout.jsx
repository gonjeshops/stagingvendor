import { useRouter } from "next/router"


const LoadingTimeout = () => {
    const router = useRouter()
  return (
    <div className='absolute inset-0 flex flex-col gap-4 items-center justify-center text-center'>
      <p className="text-lg font-semibold">
      Server is not responding. Please choose an action:
      </p>
      <div className="flex items-center gap-4">
        <button className='hover-blue rounded py-2 px-4' onClick={() => router.back()}>Go Back</button>
        <button className='hover-blue rounded py-2 px-4' onClick={() => window.location.reload()}>Reload</button>
      </div>
  </div>
  )
}

export default LoadingTimeout