import { Pool } from "pg";

const pool = new Pool(); // tạo pool mới

export default {
    query: (text: string, params: any[]) => {  // export query function => db
        return pool.query(text, params);
    },
};