'use client'
import TaskTable, { Priority, Task } from '@/components/TaskTable/TaskTable'
import React, { useEffect, useState } from 'react'
import { VscSettings } from "react-icons/vsc";
import { FaUserAlt } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { MdArrowForwardIos } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import Selectbox from '@/components/Selectbox/Selectbox';
import { itemsPerPageOptions } from '@/lib/constants';
import AddTaskPopup from '@/components/AddTaskPopup/AddTaskPopup';
import { toast, ToastContainer } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import { deleteTasks } from '@/lib/tasks';
import PriorityFiltrPopup from '@/components/PriorityFiltrPopup/PriorityFiltrPopup';
import { IoIosClose } from 'react-icons/io'

type ResponseData = {
  data: Task[],
  isNextPage: boolean,
  totalRows: number
}

const page = () => {

  const [page, setPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>((itemsPerPageOptions[0].value as number))
  const [totalRows, setTotalRows] = useState<number>(0)
  const [isNextPage, setIsNextPage] = useState<boolean>(false)
  const [data, setData] = useState<Task[]>([])
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [showAddTaskPopup, setShowAddTaskPopup] = useState(false)
  const [priorityFilter, setPriorityFilter] = useState<Priority | null>(null)
  const [showPriorityPopup, setShowPriorityPopup] = useState(false)

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks', {
        method: "GET",
        headers: {
          'page': page.toString(),
          'itemsPerPage': itemsPerPage.toString()
        }
      });
      const result: ResponseData = await response.json()
      setData(result.data)
      setIsNextPage(result.isNextPage)
      setTotalRows(result.totalRows)
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const deleteSelectedTasks = async () => {
    const ans = await deleteTasks(selectedItems)
    if(ans === 200) {
        toast.success('Success!')
        setSelectedItems([])
        fetchTasks()
    } else {
        toast.error('Error!')
    }
  }

  useEffect(() => {
    setShowPriorityPopup(false)
  }, [priorityFilter])

  useEffect(() => {
    fetchTasks()
  }, [page]);

  useEffect(() => {
    if (data.length > 0) {
      setSelectAll(data.every(item => selectedItems.includes(item.id)));
    }
  }, [data, selectedItems]);

  const handleCheckboxChange = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedItems(prev =>
        prev.filter(item => !data.some(dataItem => dataItem.id === item))
      );
    } else {
      const ids = data.map(item => item.id)
      setSelectedItems(prev => [...prev, ...ids.filter(item => !prev.includes(item))]);
    }
  };


  return (
    <>
      {showAddTaskPopup && <AddTaskPopup fetchTasks={fetchTasks} setShowPopup={setShowAddTaskPopup} />}
      {showPriorityPopup && <PriorityFiltrPopup priorityFilter={priorityFilter} setShowPopup={setShowPriorityPopup} setPriorityFilter={setPriorityFilter}/>}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className='p-10 flex flex-col gap-5'>

        <section className='flex justify-between items-center'>
          <div className='flex gap-4'>
            <input
              className='bg-transparent appearance-none inset-0 py-1.5 px-4 border border-solid border-dark-200 placeholder:text-dark-300 rounded-lg outline-none text-sm'
              placeholder='Filter tasks...'
            />

            <button className='defaultButton border-dashed'>
              <CiCirclePlus style={{ fontSize: '18px' }} />
              <p>Status</p>
            </button>

            <button onClick={() => setShowPriorityPopup(prev => !prev)} className='defaultButton border-dashed'>
              {priorityFilter ? <IoIosClose /> : <CiCirclePlus style={{ fontSize: '18px' }} />}
              <p>{priorityFilter || 'Priority'}</p>
            </button>
          </div>

          <div className='flex gap-4 items-center'>
            {selectedItems?.length >= 1 && <MdDelete style={{color: '#dc2626'}} className='hover:cursor-pointer' onClick={deleteSelectedTasks} />}
            <button onClick={() => setShowAddTaskPopup(true)} className='defaultButton'>
              <CiCirclePlus style={{ fontSize: '18px' }} />
              <p>New</p>
            </button>
            <button className='defaultButton'>
              <VscSettings style={{ fontSize: '18px' }} />
              <p>View</p>
            </button>

            <div className='rounded-full bg-dark-200 p-2.5 hover:cursor-pointer'>
              <FaUserAlt style={{ fontSize: '14px', color: '#c5c5c7' }} />
            </div>
          </div>

        </section>

        <TaskTable fetchTasks={fetchTasks} handleSelectAllChange={handleSelectAllChange} selectAll={selectAll} data={data} selectedItems={selectedItems} handleCheckboxChange={handleCheckboxChange} />

        <section className='flex justify-between items-center px-4 text-sm text-dark-500'>

          <p className=''>{selectedItems.length} of {totalRows} row(s) selected.</p>

          <div className='flex items-center gap-1.5'>

            <div className='flex gap-2 items-center'>
              <p>Rows per page</p>
              <div className='w-[75px]'>
                <Selectbox options={itemsPerPageOptions} setSelected={setItemsPerPage} selected={itemsPerPage} />
              </div>
            </div>

            <p className='mx-10'>Page {page} of {Math.ceil(totalRows / itemsPerPage) || 1}</p>

            <button onClick={() => setPage(1)} disabled={page === 1} className="p-2 border border-dark-200 rounded-lg hover:cursor-pointer">
              <MdKeyboardDoubleArrowLeft style={{ color: page !== 1 ? '#ffffff' : '' }} />
            </button>

            <button onClick={() => setPage(prev => prev - 1)} disabled={page === 1} className="p-2 border border-dark-200 rounded-lg hover:cursor-pointer">
              <MdArrowForwardIos style={{ rotate: '180deg', color: page !== 1 ? '#ffffff' : '' }} />
            </button>

            <button onClick={() => setPage(prev => prev + 1)} disabled={!isNextPage} className="p-2 border border-dark-200 rounded-lg hover:cursor-pointer">
              <MdArrowForwardIos style={{ rotate: '0deg', color: isNextPage ? '#ffffff' : '' }} />
            </button>

            <button onClick={() => setPage(totalRows / itemsPerPage)} disabled={!isNextPage} className="p-2 border border-dark-200 rounded-lg hover:cursor-pointer">
              <MdKeyboardDoubleArrowLeft style={{ rotate: '180deg', color: isNextPage ? '#ffffff' : '' }} />
            </button>

          </div>

        </section>

      </div>
    </>

  )
}

export default page