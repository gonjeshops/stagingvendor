import { useRouter } from "next/router"
import { useEffect } from "react"

const Login = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/signin/customer')
      
    }, [])

  return (
    <>
        {/* redirects */}
    </>
  )
}

export default Login