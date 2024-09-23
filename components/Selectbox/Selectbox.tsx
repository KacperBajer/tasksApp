'use client'
import React, { useEffect, useState } from 'react'
import { FaSort } from "react-icons/fa";

export type selectboxOption = {
    id: number,
    text: string,
    value: string | number
}

type Props = {
    selected: string | number,
    setSelected: Function,
    options: selectboxOption[],
    width?: number 
}

const Selectbox = ({selected, setSelected, options, width}: Props) => {
    
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsOpen(prev => !prev)
    }, [selected])

  return (
    <div className='relative select-none'>
        <div style={{width: width ? `${width}px` : '75px'}} onClick={() => setIsOpen(prev => !prev)} className='rounded-lg border border-dark-200 flex items-center hover:cursor-pointer justify-between px-4 py-2'>
            <p>{selected}</p>
            <FaSort />
        </div>
        {isOpen && <div style={{width: width ? `${width}px` : '75px'}}  className='left-0 top-10 absolute p-2 bg-dark-200/20 rounded-xl w-[75px]'>
            {options?.map(item => <button onClick={() => setSelected(item.value)} key={item.id} className='px-4 py-2 hover:bg-dark-200/75 rounded-lg hover:cursor-pointer'>{item.text}</button>)}
        </div>}
    </div>

  )
}

export default Selectbox