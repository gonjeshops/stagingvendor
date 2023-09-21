import AuthForm from "../../../components/forms/AuthForm"


const index = () => {
  return (
    <AuthForm 
          type={'Sign Up'}
          typeLabel={'Create your account today'}
          typeText={'Sign up as'}
          activeForm="supplier"
          route='signup'
        />
  )
}

export default index