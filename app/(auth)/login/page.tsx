'use client'
import { loginUser } from '@/lib/users'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {

    const router = useRouter()

    const [inputValue, setInputValue] = useState({
        login: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setInputValue(prev => ({...prev, [name]: value}))
    }


    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      const auth = await loginUser(inputValue.login, inputValue.password)
      if(auth === 'err') {
        console.log('err')
        return
      }
      document.cookie = `session=${auth}; path=/`
      router.push('/')
    }

  return (
    <div className='h-full py-10 px-3 flex justify-center items-center'>
        <form onSubmit={handleSubmit} className=' max-w-[440px] border rounded-md border-dark-200 px-5 py-10 flex flex-col items-center'>
            <p className='text-3xl mb-4'>Log In</p>
            <p className='mb-7 text-center text-sm text-dark-400'>Welcome to the Task Management Panel. Please log in to access your dashboard and manage your tasks.</p>
            <input
                className='bg-transparent appearance-none inset-0 py-1.5 px-4 border border-solid border-dark-200 placeholder:text-dark-300 rounded-lg outline-none w-full text-sm'
                placeholder='Login'
                value={inputValue.login}
                type='text'
                name='login'
                onChange={handleChange}
              />
            <input
                className='bg-transparent appearance-none inset-0 py-1.5 px-4 border border-solid border-dark-200 placeholder:text-dark-300 rounded-lg outline-none w-full text-sm mt-2'
                placeholder='Password'
                name='password'
                value={inputValue.password}
                type='Password'
                onChange={handleChange}
              />
              <button type='submit' className='bg-blue-800 w-full px-4 py-1.5 rounded-lg text-center appearance-none mt-3 text-sm'>Submit</button>
        </form>
    </div>
  )
}

export default page