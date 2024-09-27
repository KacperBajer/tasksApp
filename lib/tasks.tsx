'use server'
import { Pool } from "pg"
import conn from "./db"

export const getTasks = async (page: number, itemsPerPage: number) => {
    try {
        
        const countQuery = 'SELECT COUNT(*) FROM tasks';
        const countResult = await (conn as Pool).query(countQuery);
        const totalRows = countResult.rows[0].count;

        const query = 'SELECT * FROM tasks ORDER BY id DESC LIMIT $1 OFFSET $2'
        const response = await (conn as Pool).query(query, [itemsPerPage, page*itemsPerPage])
        
        return {
            data: response.rows,
            isNextPage: page*itemsPerPage + itemsPerPage < totalRows,
            totalRows: totalRows
        }
    } catch (error) {
        return {
            data: [],
            isNextPage: false,
            totalRows: 0
        }
    }
}
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
