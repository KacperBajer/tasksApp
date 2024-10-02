'use server'
import { Pool } from "pg";
import conn from "./db";
import { setSession } from "./session";

export const loginUser = async (login : string, password: string) => {
    try {   
        const query = 'SELECT * FROM users WHERE login = $1 AND password = $2'
  
        if(!login || !password) {
          return 'err'
        }
  
        const result = await (conn as Pool).query(
          query, [login, password]
        );
        
        if(result.rows.length < 1) {
          return 'err'
        }
  
        const session = await setSession(result.rows[0].id)
  
        if(session === 'err') {
          return 'err'
        }    
  
        return session
      } catch ( error ) {
        console.log( error );
        return 'err'
      }
}