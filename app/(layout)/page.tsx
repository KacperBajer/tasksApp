'use client'
import TaskTable, { Priority, Status, Task } from '@/components/TaskTable/TaskTable'
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
import PriorityFilterPopup from '@/components/PriorityFilterPopup/PriorityFilterPopup';
import StatusFilterPopup from '@/components/StatusFilterPopup/StatusFilterPopup';
import { sortTasksFunc } from '@/lib/sortTask';

type ResponseData = {
  data: Task[],
  isNextPage: boolean,
  totalRows: number
}
export type SortMode = "Priority" | "PriorityReverse" | "Section" | "SectionReverse" | "Status" | "StatusReverse" | null

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
  const [statusFilter, setStatusFilter] = useState<Status | null>(null)
  const [showPriorityPopup, setShowPriorityPopup] = useState(false)
  const [showStatusPopup, setShowStatusPopup] = useState(false)
  const [filterInput, setFilterInput] = useState('')
  const [sortMode, setSortMode] = useState<SortMode>()

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks', {
        method: "GET",
        headers: {
          'page': page.toString(),
          'itemsPerPage': itemsPerPage.toString(),
          'priorityFilter': (priorityFilter as string),
          'statusFilter': (statusFilter as string),
          'titleFilter': filterInput
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
    if (ans === 200) {
      toast.success('Success!')
      setSelectedItems([])
      fetchTasks()
    } else {
      toast.error('Error!')
    }
  }

  useEffect(() => {
    setShowStatusPopup(false)
  }, [statusFilter])

  useEffect(() => {
    setShowPriorityPopup(false)
  }, [priorityFilter])

  useEffect(() => {
    fetchTasks()
  }, [page, statusFilter, priorityFilter]);

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

  const handleSort = (sortBy: "Priority" | "Status" | "Section") => {
    if(sortBy === sortMode) {
      const reverse = data.reverse()
      setData(reverse)
      setSortMode(`${sortBy}Reverse`)
    } else {
      const sortedData = sortTasksFunc(data, sortBy)
      setSortMode(sortBy)
      setData(sortedData)
    }
  }

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
      {showPriorityPopup && <PriorityFilterPopup priorityFilter={priorityFilter} setShowPopup={setShowPriorityPopup} setPriorityFilter={setPriorityFilter} />}
      {showStatusPopup && <StatusFilterPopup statusFilter={statusFilter} setShowPopup={setShowStatusPopup} setStatusFilter={setStatusFilter} />}
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
      <div className='py-10 px-3 flex flex-col gap-5'>

        <section className='flex flex-col gap-3 md:flex-row md:justify-between md:items-center'>
          <div className='flex flex-col md:flex-row gap-4'>
            <form onSubmit={(e) => {
              e.preventDefault()
              fetchTasks()
            }}>
              <input
                className='bg-transparent appearance-none inset-0 py-1.5 px-4 border border-solid border-dark-200 placeholder:text-dark-300 rounded-lg outline-none text-sm'
                placeholder='Filter tasks...'
                value={filterInput}
                onChange={(e) => setFilterInput(e.target.value)}
              />
            </form>

            <div className='flex gap-4'>
              <button onClick={() => setShowStatusPopup(prev => !prev)} className='defaultButton border-dashed'>
                <CiCirclePlus style={{ fontSize: '18px' }} />
                <p>{statusFilter || 'Status'}</p>
              </button>

              <button onClick={() => setShowPriorityPopup(prev => !prev)} className='defaultButton border-dashed'>
                <CiCirclePlus style={{ fontSize: '18px' }} />
                <p>{priorityFilter || 'Priority'}</p>
              </button>
            </div>

          </div>

          <div className='flex gap-4 items-center'>
            {selectedItems?.length >= 1 && <MdDelete style={{ color: '#dc2626' }} className='hover:cursor-pointer' onClick={deleteSelectedTasks} />}
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

        <TaskTable handleSort={handleSort} fetchTasks={fetchTasks} handleSelectAllChange={handleSelectAllChange} selectAll={selectAll} data={data} selectedItems={selectedItems} handleCheckboxChange={handleCheckboxChange} />

        <section className='flex flex-col md:flex-row gap-3 md:justify-between md:items-center px-4 text-sm text-dark-500'>

          <p className=''>{selectedItems.length} of {totalRows} row(s) selected.</p>

          <div className='flex flex-col md:flex-row gap-3 md:items-center md:gap-10'>

            <div className='flex gap-2 items-center'>
              <p>Rows per page</p>
              <div className='w-[75px]'>
                <Selectbox options={itemsPerPageOptions} setSelected={setItemsPerPage} selected={itemsPerPage} />
              </div>
            </div>

            <div className='flex gap-2 items-center'>
              <p className=''>Page {page} of {Math.ceil(totalRows / itemsPerPage) || 1}</p>

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
           

          </div>

        </section>

      </div>
    </>

  )
}

export default page