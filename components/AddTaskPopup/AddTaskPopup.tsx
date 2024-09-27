'use client'
import React, { useEffect, useState } from 'react'
import TaskForm from '../TaskFrom/TaskForm'
import { createTask } from '@/lib/tasks'
import { IoIosClose } from "react-icons/io";
import { toast } from 'react-toastify';

type Props = {
    setShowPopup: (state: boolean) => void
    fetchTasks: () => void
}

type TaskData = {
    task: string
    title: string
    status: string
    section: string
    priority: string
}

const AddTaskPopup = ({ setShowPopup, fetchTasks }: Props) => {

    const handleSubmit = async (data: TaskData) => {
        const res = await createTask(data.task, data.title, data.status, data.section, data.priority)
        if (res === 200) {
           toast.success("Success!")
           fetchTasks()
           setShowPopup(false)
           return
        }
        toast.error("Error!")
    }

    return (
        <>
            <div onClick={() => setShowPopup(false)} className='fixed w-full h-full top-0 left-0 z-[40] bg-black/80 '></div>
            <div className='absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 w-full max-w-[700px] z-[70] bg-black border-dark-200 border  rounded-md p-5 flex flex-col'>
                <p className='text-center text-3xl text-gray-300 mb-4'>Create new task!</p>
                <p className='text-sm text-center text-dark-300 mb-7 max-w-[400px] mx-auto'>Here, you can create a new task for your team, assign roles, and track progress for better collaboration.</p>
                <TaskForm handleSubmit={handleSubmit} />
                <IoIosClose onClick={() => setShowPopup(false)} style={{ fontSize: '28px', color: '#636365' }} className='absolute top-5 right-5 hover:cursor-pointer' />
            </div>
        </>
    )
}

export default AddTaskPopup