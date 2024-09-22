import React, { ReactNode } from 'react'

const layout = ({children}: {children: ReactNode}) => {
  return (
    <div className='h-screen max-h-screen flex bg-dark-100 text-white'>
        <div className='overflow-hidden flex-1'>
            {children}
        </div>
    </div>
  )
}

export default layout