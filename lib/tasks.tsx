'use server'
import { Pool } from "pg"
import conn from "./db"

export const getTasks = async (page: number, itemsPerPage: number, priorityFilter: string | null, statusFilter: string | null, titleFilter: string) => {
    try {

        let whereConditions: string[] = [];
        let whereConditionsCountQuery: string[] = [];
        let queryParams: any[] = [itemsPerPage, page * itemsPerPage];

        if (priorityFilter) {
            whereConditions.push(`priority = $${queryParams.length + 1}`);
            whereConditionsCountQuery.push(`priority = $${queryParams.length - 1}`);
            queryParams.push(priorityFilter);
        }

        if (statusFilter) {
            whereConditions.push(`status = $${queryParams.length + 1}`);
            whereConditionsCountQuery.push(`status = $${queryParams.length - 1}`);
            queryParams.push(statusFilter);
        }

        if (titleFilter) {
            whereConditions.push(`title ILIKE $${queryParams.length + 1}`);
            whereConditionsCountQuery.push(`title ILIKE $${queryParams.length - 1}`);
            queryParams.push(`%${titleFilter}%`); 
        }

        const whereClause = whereConditions.length ? ' WHERE ' + whereConditions.join(' AND ') : '';  
        const whereClauseCountQuery = whereConditionsCountQuery.length ? ' WHERE ' + whereConditionsCountQuery.join(' AND ') : '';  

        const countQuery = `SELECT COUNT(*) FROM tasks${whereClauseCountQuery}`;
        const countParams = queryParams.slice(2); 
        const countResult = await (conn as Pool).query(countQuery, countParams);
        const totalRows = countResult.rows[0].count;

        const query = `SELECT * FROM tasks${whereClause} ORDER BY id DESC LIMIT $1 OFFSET $2`;
        const response = await (conn as Pool).query(query, queryParams);

        return {
            data: response.rows,
            isNextPage: page * itemsPerPage + itemsPerPage < totalRows,
            totalRows: totalRows
        };
    } catch (error) {
        console.log(error)
        return {
            data: [],
            isNextPage: false,
            totalRows: 0
        };
    }
};
export const createTask = async (task: string, title: string, status: string, section: string, priority: string) => {

    try {
        
        const query = 'INSERT INTO tasks (task, title, status, section, priority) VALUES ($1, $2, $3, $4, $5)'
        const response = await (conn as Pool).query(query, [task, title, status, section, priority])
        
        return 200
    } catch (error) {
        return 500
    }
}
export const editTask = async (task: string, title: string, status: string, section: string, priority: string, id: number) => {

    try {
        
        const query = 'UPDATE tasks SET task = $1, title = $2, status = $3, section = $4, priority = $5 WHERE id = $6'
        const response = await (conn as Pool).query(query, [task, title, status, section, priority, id])
        
        return 200
    } catch (error) {
        return 500
    }
}
export const deleteTasks = async (ids: number[]) => {

    try {
        const query = 'DELETE FROM tasks WHERE id = ANY($1::int[])'
        const response = await (conn as Pool).query(query, [ids])
        return 200
    } catch (error) {
        console.log(error)
        return 500
    }
}
