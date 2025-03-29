import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'

const Login = () => {
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")

  const {loading,login}=useLogin()
  const handleSubmit =async(e)=>{
    e.preventDefault()
    await login(username,password)
  }
  return (
    <div className='container mx-auto py-12 px-6 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <h1 className="text-4xl font-bold text-center text-primary mb-6">Login</h1>
      <p className="text-lg text-center max-w-2xl mx-auto mb-8">
        Create an account to start using our services.
      </p>
        <div className='max-w-lg mx-auto bg-base-100 shadow-lg p-6 rounded-lg'>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='label-text text-base'>Username</span>
            </label>
            <input type="text" placeholder='enter username' className='w-full input input-bordered h-10'
            value={username}
            onChange={(e)=>setUsername(e.target.value)}/>
          </div>
          <div>
          <label className='label p-2'>
              <span className='label-text text-base'>Password</span>
            </label>
            <input type="password" placeholder='enter password' className='w-full input input-bordered h-10'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <Link to="/signup" className='text-sm hover:underline hover:text-blue-400 mt-2 inline-block'>
            {"Don't"} have an account?
          </Link>
          <div>
            <button className='btn btn-block btn-sm mt-2' disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span>:"Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login