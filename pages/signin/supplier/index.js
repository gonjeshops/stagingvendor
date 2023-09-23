import AuthForm from "@/componentsB2b/AuthForms/AuthForm"



const index = () => {
  return (
    <AuthForm 
      type={'Sign in'}
      typeLabel={'Sign in to your account'}
      typeText={'Sign in as'}
      activeForm="supplier"
      route='signin'
    />
  )
}

export default index