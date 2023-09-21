import Link from 'next/link'

const SuplierLoginForm = () => {
  return (
    <div className="w-full w-full rounded-md  pb-6">
      <form  className="space-y-8 pb-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <label for="email" className="block text-sm">Email address</label>
            <input type="email" name="email" id="email" placeholder="name@example.com" className="w-full px-3 py-2 border rounded-md border-gray-400 focus:dark:border-green-400" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label for="password" className="text-sm">Password</label>
              <Link  href="#" className="text-xs hover:underline text-gray-500">Forgot password?</Link>
            </div>
            <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md dark:border-gray-400   focus:dark:border-green-400" />
          </div>
        </div>

        <button type="button" className="w-full text-white px-8 py-3 font-semibold rounded-md bg-green-600 ">Sign in</button>
      </form>

      <p className="text-sm text-center    'text-gray-400">Dont have account?
        <Link href="#" className="focus:underline hover:underline">Sign up here</Link>
      </p>
    </div>
  )
}

export default SuplierLoginForm