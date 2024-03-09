import { client } from "../Database/databasePostgres.js";

const getBooks = async () => {
    try {
        const result = await client.query('select * from books');
        return result.rows;
    }
    catch (err) {
        return err.message;
    }
}

const getBooksByName = async (name) => {
    try {
         const result = await client.query("SELECT * FROM books WHERE name LIKE $1", [`%${name}%`]);
         return result.rows;
    }
    catch (err) {
        return err.message;
    }
}

const saveBook = async(book)=> {
    try {
        const query = 'INSERT INTO books (name, author) VALUES ($1, $2)'
        const values = [book.name, book.author];
        await client.query(query,values);
    } catch (err) {
        console.log(err.message);
    }
}

export default {getBooks,getBooksByName, saveBook}