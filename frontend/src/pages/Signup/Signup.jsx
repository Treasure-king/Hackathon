import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import useSignUp from '../../hooks/useSignup'
import GenderCheckBox from './GenderCheckBox'

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
  })

  const{loading,signup}=useSignUp()
  const handleCheckBoxChange = (gender)=>{
    setInputs({...inputs,gender})
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    await signup(inputs)
  }
  return (
    <div className='container mx-auto py-12 px-6 shadow-md  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-primary'>Signup</h1>
        <p className="text-lg text-center max-w-2xl mx-auto my-4">
        Create an account to start using our services.
      </p>
        <div className='max-w-lg mx-auto bg-base-100 shadow-lg p-6 rounded-lg'>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='label-text text-base'>full Name</span>
            </label>
            <input type="text" placeholder='enter Name' className='w-full input input-bordered h-10'
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })} />
          </div>
          <div>
            <label className='label p-2'>
              <span className='label-text text-base'>Username</span>
            </label>
            <input type="text" placeholder='enter Username' className='w-full input input-bordered h-10'
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })} />
          </div>
          <div>
            <label className='label p-2'>
              <span className='label-text text-base'>Password</span>
            </label>
            <input type="password" placeholder='enter Password' className='w-full input input-bordered h-10'
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
          </div>
          <div>
            <label className='label p-2'>
              <span className='label-text text-base'>Confirm Password</span>
            </label>
            <input type="password" placeholder='confirm Password' className='w-full input input-bordered h-10'
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })} />
          </div>

          <GenderCheckBox onCheckboxChange={handleCheckBoxChange} selectedGender={inputs.gender}/>

          <Link to="/login" className='text-sm hover:underline hover:text-blue-400 mt-2 inline-block'>
            Already have an account?
          </Link>
          <div>
            <button className='btn btn-block btn-sm mt-2' disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span>:"Sign Up"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup