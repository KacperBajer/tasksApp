'use client'
import React, { useState } from 'react'
import { FaSort } from "react-icons/fa";
import CustomCheckbox from '../CustomCkeckbox/CustomCheckbox';
import { MdMoreHoriz } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaRegTimesCircle } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import MoreBox from '../MoreBox/MoreBox';
import EditTaskPopup from '../EditTaskPopup/EditTaskPopup';
import { createTask, deleteTasks } from '@/lib/tasks';
import ConfirmDeletePopup from '../ConfirmDeletePopup/ConfirmDeletePopup';
import { toast } from 'react-toastify';
import { SortMode } from '@/app/(layout)/page';

export type Status = 'In progress' | 'Done' | 'Canceled' | 'To do' | 'Backlog'
export type Priority = 'High' | 'Medium' | 'Low'
export type Section = 'Documentation' | 'Bug' | 'Feature'
export type Task = {
    id: number,
    task: string;
    title: string;
    status: Status;
    section: Section;
    priority: Priority;
};

type TaskTableProps = {
    data: Task[]
    selectedItems: number[]
    handleCheckboxChange: Function
    selectAll: boolean
    handleSelectAllChange: Function
    fetchTasks: () => void
    handleSort: (sortBy: "Priority" | "Status" | "Section") => void
}

const TaskTable = ({ data, handleSort, selectedItems, handleCheckboxChange, selectAll, handleSelectAllChange, fetchTasks }: TaskTableProps) => {

    const [moreBoxPosition, setMoreBoxPosition] = useState<{ top: number, left: number } | null>(null);
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const [showEditPopup, setShowEditPopup] = useState<Task | null>(null)
    const [showDeletePopup, setShowDeletePopup] = useState<boolean | number[]>(false)

    const handleDelete = async (ids: number[]) => {
        const ans = await deleteTasks(ids)
        if(ans === 200) {
            toast.success('Success!')
            fetchTasks()
        } else {
            toast.error('Error!')
        }
        setShowDeletePopup(false)
    }

    const copy = async () => {
        const ans = await createTask(activeTask?.task as string, activeTask?.title as string, activeTask?.status as string, activeTask?.section as string, activeTask?.priority as string)
       if(ans === 200) {
            toast.success('Success!')
            fetchTasks()
       } else {
            toast.error('Error!')
       } 
       setActiveTask(null)
    }

    const statusIcon = (status: Status) => {
        switch (status) {
            case 'Done':
                return <FaRegCheckCircle style={{ fontSize: '18px' }} />
            case 'In progress':
                return <FaRegClock style={{ fontSize: '18px' }} />
            case 'Canceled':
                return <FaRegTimesCircle style={{ fontSize: '18px' }} />
            case 'To do':
                return <FaRegCircle style={{ fontSize: '18px' }} />
            case 'Backlog':
                return <FaRegQuestionCircle style={{ fontSize: '18px' }} />
        }
    }

    const handleMoreClick = (e: React.MouseEvent, task: Task) => {
        if(activeTask?.id === task.id) {
            return
        } 
        const buttonRect = (e.target as HTMLElement).getBoundingClientRect();
        setMoreBoxPosition({ top: buttonRect.bottom, left: buttonRect.left });
        setActiveTask(task);
    };

    return (
        <>
        <div className='overflow-x-auto'>
            <div className='w-full min-w-fit border-collapse outline-dark-200 text-dark-400 text-sm rounded-xl overflow-hidden'>
                <div className='border border-dark-200 text-dark-500 flex items-center rounded-t-xl'>
                    <div className='px-5 py-2 w-[61px]'>
                        <div className='flex items-center'>
                            <CustomCheckbox isChecked={selectAll} handleChange={() => handleSelectAllChange()} />
                        </div>
                    </div>
                    <div className='px-5 py-2 text-left font-normal min-w-[150px]'>Task</div>
                    <div className='px-5 py-2 min-w-[400px] flex-1'>
                        <div className='flex items-center gap-2'>
                            <p className='text-left font-normal'>Title</p>
                            <FaSort onClick={() => handleSort("Section")} className='hover:cursor-pointer' />
                        </div>
                    </div>
                    <div className='px-5 py-2 w-[150px]'>
                        <div className='flex items-center gap-2'>
                            <p className='text-left font-normal'>Status</p>
                            <FaSort onClick={() => handleSort("Status")} className='hover:cursor-pointer' />
                        </div>
                    </div>
                    <div className='px-5 py-2 w-[130px]'>
                        <div className='flex items-center gap-2'>
                            <p className='text-left font-normal'>Priority</p>
                            <FaSort onClick={() => handleSort("Priority")} className='hover:cursor-pointer' />
                        </div>
                    </div>
                    <div className='pr-5 pl-7 py-2 text-xl font-normal w-[70px]'>
                        <MdMoreHoriz />
                    </div>
                </div>
                {data?.map((item, index) => (
                    <div key={item.id} className={`border border-dark-200 flex items-center w-full ${data.length - 1 === index && 'rounded-b-xl'}`}>
                        <div className='py-2 px-5 w-[61px]'>
                            <div className='flex items-center'>
                                <CustomCheckbox id={item.id} isChecked={selectedItems.includes(item.id)} handleChange={() => handleCheckboxChange(item.id)} />
                            </div>
                        </div>
                        <div className='px-5 py-2 min-w-[150px]'>{item.task}</div>
                        <div className='px-5 py-2 min-w-[400px] flex-1'>
                            <div className='flex items-center gap-2'>
                                <div className='px-3 py-0.5 border border-dark-200 rounded-md h-fit'>{item.section}</div>
                                {item.title}
                            </div>
                        </div>
                        <div className='px-5 py-2 w-[150px]'>
                            <div className='flex items-center gap-2'>
                                {statusIcon(item.status)}
                                {item.status}
                            </div>
                        </div>
                        <div className='px-5 py-2 w-[130px]'>
                            <div className='flex items-center gap-2'>
                                <FaArrowRight
                                    style={{
                                        rotate: item.priority === 'High' ? '270deg' :
                                            item.priority === 'Low' ? '90deg' : '0deg'
                                    }}
                                />
                                {item.priority}
                            </div>
                        </div>
                        <div className='relative overflow-visible px-5 py-2 text-xl w-[70px]'>
                            <button onClick={(e) => handleMoreClick(e, item)} className={`p-2 hover:cursor-pointer hover:bg-dark-200 rounded-lg ${activeTask?.id === item.id && 'bg-dark-200'}`}>
                                <MdMoreHoriz />
                            </button>
                            {activeTask?.id === item.id && moreBoxPosition && <MoreBox copy={copy} setShowDeletePopup={setShowDeletePopup} activeTask={activeTask} setActiveTask={setActiveTask} setShowEditPopup={setShowEditPopup} moreBoxPosition={moreBoxPosition} />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        {showEditPopup?.id && <EditTaskPopup fetchTasks={fetchTasks} setShowPopup={setShowEditPopup} initialData={(showEditPopup as Task)} />}
        {showDeletePopup && <ConfirmDeletePopup handleSubmit={() => handleDelete((showDeletePopup as number[]))} setShowPopup={setShowDeletePopup} text={'Are you sure you want to delete this item?'} />}
        </>
    )
}

export default TaskTable