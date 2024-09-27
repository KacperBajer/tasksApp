import { selectboxOption } from "@/components/Selectbox/Selectbox";

export const itemsPerPageOptions: selectboxOption[] = [
  {
    id: 1,
    text: '10',
    value: 10
  },
  {
    id: 2,
    text: '20',
    value: 20
  },
  {
    id: 3,
    text: '50',
    value: 50
  },
]
export const statusOptions: selectboxOption[] = [
  {
    id: 1,
    text: 'In progress',
    value: 'In progress'
  },
  {
    id: 2,
    text: 'Done',
    value: 'Done'
  },
  {
    id: 3,
    text: 'Canceled',
    value: 'Canceled'
  },
  {
    id: 4,
    text: 'To do',
    value: 'To do'
  }, 
  {
    id: 5,
    text: 'Backlog',
    value: 'Backlog'
  }
]
export const sectionOptions: selectboxOption[] = [
  {
    id: 1,
    text: 'Documentation',
    value: 'Documentation'
  },
  {
    id: 2,
    text: 'Bug',
    value: 'Bug'
  },
  {
    id: 3,
    text: 'Feature',
    value: 'Feature'
  },
]
export const priorityOptions: selectboxOption[] = [
  {
    id: 1,
    text: 'Low',
    value: 'Low'
  },
  {
    id: 2,
    text: 'Medium',
    value: 'Medium'
  },
  {
    id: 3,
    text: 'High',
    value: 'High'
  },
]
export const filterPriorityOptions: selectboxOption[] = [
  {
    id: 1,
    text: 'All',
    value: null
  },
  {
    id: 2,
    text: 'Low',
    value: 'Low'
  },
  {
    id: 3,
    text: 'Medium',
    value: 'Medium'
  },
  {
    id: 4,
    text: 'High',
    value: 'High'
  },
]