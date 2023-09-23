import AuthForm from "@/componentsB2b/AuthForms/AuthForm"

const Vendor = () => {
  return (
    <div>
        <AuthForm 
          type={'Sign Up'}
          typeLabel={'Create your account today'}
          typeText={'Sign up as'}
          activeForm="vendor"
          route='signup'
        />
    </div>
  )
}

export default Vendor