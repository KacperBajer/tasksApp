import React from 'react'
import Selectbox from '../Selectbox/Selectbox'
import { filterPriorityOptions } from '@/lib/constants'
import { Priority } from '../TaskTable/TaskTable'

type Props = {
    setShowPopup: (state: boolean) => void
    setPriorityFilter: (state: Priority | null) => void
    priorityFilter: Priority | null
}

const PriorityFilterPopup = ({setShowPopup, setPriorityFilter, priorityFilter}: Props) => {
  return (
    <>
        <div onClick={() => setShowPopup(false)} className='fixed w-full h-full top-0 left-0 z-[40] bg-black/80 '></div>
        <div className='absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 w-fit min-w-[200px] max-w-[400px] z-[70] bg-black border-dark-200 border  rounded-md p-5 flex flex-col'>
            <p className='text-center text-3xl text-gray-300 mb-4'>Priority</p>
            <Selectbox setSelected={setPriorityFilter} options={filterPriorityOptions} selected={priorityFilter || "All"} />
        </div>
    </>
)
}

export default PriorityFilterPopup