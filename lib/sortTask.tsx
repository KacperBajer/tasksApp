import { Priority, Section, Status, Task } from "@/components/TaskTable/TaskTable";

export const sortTasksFunc = (tasks: Task[], sortMode: "Priority" | "Status" | "Section") => {
    
    const priorityOrder: { [key in Priority]: number } = {
      'High': 1,
      'Medium': 2,
      'Low': 3
    };
    const statusOrder: { [key in Status]: number } = {
      'Backlog': 1,
      'To do': 2,
      'In progress': 3,
      'Done': 4,
      "Canceled": 5
    };
    const sectionOrder: { [key in Section]: number } = {
      'Bug': 1,
      'Feature': 2,
      'Documentation': 3
    };

    switch(sortMode) {
      case "Priority": 
        return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      case "Status":
        return tasks.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
      case "Section":
        return tasks.sort((a, b) => sectionOrder[a.section] - sectionOrder[b.section]);
    }

  };