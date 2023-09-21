import AuthForm from "../../../components/forms/AuthForm"

const CustormerSignup = () => {
  return (
    <div>
      <AuthForm 
          type={'Sign in'}
          typeLabel={'Sign in to your account'}
          typeText={'Sign in as'}
          activeForm="customer"
          route='signin'
        />
    </div>
        
  )
}

export default CustormerSignup