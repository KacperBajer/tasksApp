import React from 'react'

type Props = {
    setShowPopup: (state: boolean) => void
    text: string
    handleSubmit: () => void
}

const ConfirmDeletePopup = ({setShowPopup, text, handleSubmit}: Props) => {
  return (
    <>
    <div onClick={() => setShowPopup(false)} className='fixed w-full h-full top-0 left-0 z-[40] bg-black/80 '></div>
    <div className='absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 max-w-[500px] w-fit z-[70] bg-black border-dark-200 border  rounded-md p-5 flex flex-col'>
        <p className='text-center text-xl text-gray-300 mb-4'>{text}</p>
        <div className='flex items-center gap-3'>
            <div onClick={handleSubmit} className='bg-green-700 rounded-lg flex-1 py-1.5 px-4 hover:cursor-pointer'>
                <p className='text-center'>Yes</p>
            </div>
            <div onClick={() => setShowPopup(false)} className='bg-red-700 rounded-lg flex-1 py-1.5 px-4 hover:cursor-pointer'>
                <p className='text-center'>No</p>
            </div>
        </div>
    </div>
</>
  )
}

export default ConfirmDeletePopup