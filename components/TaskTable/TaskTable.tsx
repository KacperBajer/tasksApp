import React from 'react'
import { FaSort } from "react-icons/fa";
import CustomCheckbox from '../CustomCkeckbox/CustomCheckbox';
import { MdMoreHoriz } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaRegTimesCircle } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

type Status = 'In progress' | 'Done' | 'Canceled' | 'To do' | 'Backlog'

export type Task = {
    id: number,
    task: string;
    title: string;
    status: Status;
    section: 'Documentation' | 'Bug' | 'Feature';
    priority: 'High' | 'Medium' | 'Low';
  };

type TaskTableProps = {
    data: Task[]
}

const TaskTable = ({ data }: TaskTableProps) => {

    const statusIcon = (status: Status) => {
        switch(status) {
            case 'Done':
                return <FaRegCheckCircle style={{fontSize: '18px'}} />
            case 'In progress':
                return <FaRegClock style={{fontSize: '18px'}} />
            case 'Canceled':
                return <FaRegTimesCircle style={{fontSize: '18px'}} />
            case 'To do':
                return <FaRegCircle style={{fontSize: '18px'}} />
            case 'Backlog':
                return <FaRegQuestionCircle style={{fontSize: '18px'}} />
        }
    }

  return (
    <div className='overflow-auto'>
        <table className='w-full border-collapse outline outline-1 outline-dark-200 text-dark-400 text-sm overflow-hidden rounded-xl'>
            <thead className=''>
                <tr className='border border-dark-200 text-dark-500'>
                    <th className='px-5 py-2 w-[60px]'>
                        <div className='flex items-center'>
                            <CustomCheckbox />
                        </div>
                    </th>
                    <th className='px-5 py-2 text-left font-normal w-[120px]'>Task</th>
                    <th className='px-5 py-2'>
                        <div className='flex items-center gap-2'>
                            <p className='text-left font-normal'>Title</p>
                            <FaSort />
                        </div>
                    </th>
                    <th className='px-5 py-2'>
                        <div className='flex items-center gap-2'>
                            <p className='text-left font-normal'>Status</p>
                            <FaSort />
                        </div>
                    </th>
                    <th className='px-5 py-2'>
                        <div className='flex items-center gap-2'>
                            <p className='text-left font-normal'>Priority</p>
                            <FaSort />
                        </div>
                    </th>
                    <th className='pr-5 pl-7 py-2 text-xl w-[20px] font-normal'>
                        <MdMoreHoriz />
                    </th>
                </tr>
            </thead>
            <tbody>
                {data?.map(item => (
                  <tr key={item.id} className='border border-dark-200'>
                    <td className='py-2 px-5'>
                        <div className='flex items-center'>
                            <CustomCheckbox />
                        </div>
                    </td>
                    <td className='px-5 py-2'>{item.task}</td>
                    <td className='px-5 py-2'>
                        <div className='flex gap-2'>
                            <div className='px-3 py-0.5 border border-dark-200 rounded-md'>{item.section}</div>
                            {item.title}
                        </div>
                    </td>
                    <td className='px-5 py-2'>
                        <div className='flex items-center gap-2'>
                            {statusIcon(item.status)}      
                            {item.status}
                        </div>
                    </td>
                    <td className='px-5 py-2'>
                        <div className='flex items-center gap-2'>
                            <FaArrowRight 
                                style={{
                                    rotate: item.priority === 'High' ? '270deg' : 
                                    item.priority === 'Low' ? '90deg' : '0deg'
                                }}
                            />
                            {item.priority}
                        </div>
                    </td>
                    <td className='px-5 py-2 text-xl w-[20px]'>
                        <button className='p-2 hover:cursor-pointer hover:bg-dark-200 rounded-lg'>
                            <MdMoreHoriz />        
                        </button>
                    </td>
                </tr>  
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default TaskTable