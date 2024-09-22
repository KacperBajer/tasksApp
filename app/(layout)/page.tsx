import TaskTable from '@/components/TaskTable/TaskTable'
import { tableData } from '@/lib/constants'
import React from 'react'
import { VscSettings } from "react-icons/vsc";
import { FaUserAlt } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";

const page = () => {
  return (
    <div className='p-10 flex flex-col gap-5'>
      <section className='flex justify-between items-center'>
        
        <div className='flex gap-4'>
          <input 
            className='bg-transparent appearance-none inset-0 py-1.5 px-4 border border-solid border-dark-200 placeholder:text-dark-300 rounded-lg outline-none text-sm' 
            placeholder='Filter tasks...'
          />
          
          <button className='defaultButton border-dashed'>
            <CiCirclePlus style={{fontSize: '18px'}} />
            <p>Status</p>
          </button>
          
          <button className='defaultButton border-dashed'>
            <CiCirclePlus style={{fontSize: '18px'}} />
            <p>Priority</p>
          </button>
        </div>
        
        <div className='flex gap-4 items-center'>
          <button className='defaultButton'>
            <VscSettings style={{fontSize: '18px'}} />
            <p>View</p>
          </button>

          <div className='rounded-full bg-dark-200 p-2.5 hover:cursor-pointer'>
            <FaUserAlt style={{fontSize: '14px', color: '#c5c5c7'}} />
          </div>
        </div>
      
      </section>
      
      <TaskTable data={tableData} />

      <section>
        
      </section>

    </div>
  )
}

export default page