import { Pool } from "pg"
import conn from "./db"

type Response = {
    data: [],
    isNextPage: boolean,
    totalRows: number
}

export const getTasks = async (page: number, itemsPerPage: number) => {

    try {
        
        const countQuery = 'SELECT COUNT(*) FROM tasks';
        const countResult = await (conn as Pool).query(countQuery);
        const totalRows = countResult.rows[0].count;

        const query = 'SELECT * FROM tasks LIMIT $1 OFFSET $2'
        const response = await (conn as Pool).query(query, [itemsPerPage, page])
        
        return {
            data: response.rows,
            isNextPage: page*itemsPerPage + itemsPerPage < totalRows,
            totalRows: totalRows
        }
    } catch (error) {
        return []
    }
}