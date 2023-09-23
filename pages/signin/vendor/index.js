import AuthForm from "@/componentsB2b/AuthForms/AuthForm"


const Vendor = () => {
  return (
    <div>
        <AuthForm 
          type={'Sign in'}
          typeLabel={'Sign in to your account'}
          typeText={'Sign in as'}
          activeForm="vendor"
          route='signin'
        />
    </div>
  )
}

export default Vendor