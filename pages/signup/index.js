import { useEffect } from "react"
import AuthForm from "../../components/forms/AuthForm"
import {useRouter} from "next/router"

const Signup = () => {
  const router = useRouter()
useEffect(() => {
router.push('signup/customer')
}, [])

  return (
    <>
        {/* redirects */}
    </>
  )
}

export default Signup