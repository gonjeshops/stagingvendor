import { useRouter } from "next/router"
import { useEffect } from "react"

const Signup = () => {
  const router = useRouter()
  useEffect(() => {
  router.push('/signup/customer')
    
  }, [])
  
  return (
    <>
        {/* redirects */}
    </>
  )
}

export default Signup