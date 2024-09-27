'use client'
import React, { MouseEventHandler, useState } from 'react'
import Selectbox from '../Selectbox/Selectbox'
import { priorityOptions, sectionOptions, statusOptions } from '@/lib/constants'
import { Task } from '../TaskTable/TaskTable'

type Props = {
    handleSubmit: Function
    data?: Task
}

const TaskForm = ({handleSubmit, data}: Props) => {

    const [status, setStatus] = useState(data?.status || statusOptions[3].value)
    const [section, setSection] = useState(data?.section || sectionOptions[0].value)
    const [priority, setPriority] = useState(data?.priority || priorityOptions[0].value)
    const [title, setTitle] = useState(data?.title || '')
    const [task, setTask] = useState(data?.task || '')

  return (
    <div className='flex flex-col gap-3'>
        <input 
            className='bg-transparent appearance-none inset-0 py-2 px-4 border border-solid border-dark-200 placeholder:text-dark-300 rounded-lg outline-none text-sm' 
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <div className='flex gap-3'>
            <div className='flex-1'>
                <input 
                    className='bg-transparent appearance-none inset-0 py-2 px-4 border border-solid border-dark-200 placeholder:text-dark-300 rounded-lg outline-none text-sm w-full' 
                    placeholder='Task'
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
            </div>
            <div className='flex-1'>
                <Selectbox setSelected={setStatus} selected={status} options={statusOptions} />
            </div>
        </div>
        <div className='flex gap-3'>
            <div className='flex-1'>
                <Selectbox setSelected={setPriority} selected={priority} options={priorityOptions} />
            </div>
            <div className='flex-1'>
                <Selectbox setSelected={setSection} selected={section} options={sectionOptions} />
            </div>
        </div>
        <button onClick={() => handleSubmit({task, title, status, section, priority})} className='bg-blue-800 px-4 py-1.5 rounded-lg text-center appearance-none '>Submit</button>
    </div>
  )
}

export default TaskForm