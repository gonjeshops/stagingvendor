import AuthForm from "@/componentsB2b/AuthForms/AuthForm"


const CustormerSignup = () => {
  return (
    <div>
      <AuthForm 
          type={'Sign Up'}
          typeLabel={'Create your account today'}
          typeText={'Sign up as'}
          activeForm="customer"
          route='signup'
        />
    </div>
        
  )
}

export default CustormerSignup