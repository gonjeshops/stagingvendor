import { useRouter } from "next/router"
import { useEffect } from "react"

const Login = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/signin/vendor')
      
    }, [])

  return (
    <>
        {/* redirects */}
    </>
  )
}

export default Login