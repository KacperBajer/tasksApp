'use server'
import { Pool } from "pg";
import conn from "./db";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";

export const setSession = async (id: number) => {

    try {
        const sessionKey = nanoid()

        const query = 'INSERT INTO sessions (session, userid) VALUES ($1, $2)'
        const result = await (conn as Pool).query(
            query, [sessionKey, id]
        );        
        return sessionKey
    } catch (error) {
        return 'err'
    }

}

export const checkSession = async () => {
    const cookieStore = cookies();
    const session = cookieStore.get('session')?.value;
    try {
        const query = 'SELECT * FROM sessions WHERE session = $1';
        const result = await (conn as Pool).query(query, [session]);

        return result.rows.length > 0;
    } catch (error) {
        console.log(error)
        return false
    }
}