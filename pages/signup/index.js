import { useRouter } from "next/router"
import { useEffect } from "react"

const Signup = () => {
  const router = useRouter()
  useEffect(() => {
  router.push('/signup/vendor')
    
  }, [])
  
  return (
    <>
        {/* redirects */}
    </>
  )
}

export default Signup