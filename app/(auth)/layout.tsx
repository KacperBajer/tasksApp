import React, { ReactNode } from 'react'
import 'react-toastify/dist/ReactToastify.css';

const layout = ({children}: {children: ReactNode}) => {
  return (
    <div className='h-screen max-h-screen flex bg-dark-100 text-white'>
        <div className='overflow-y-auto removeScrollbar flex-1'>
          {children}
        </div>
    </div>
  )
}

export default layout