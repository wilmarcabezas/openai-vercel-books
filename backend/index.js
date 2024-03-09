import express  from 'express';
import cors from 'cors';

import connect,{client} from './Database/databasePostgres.js';
import BooksController from './Controllers/BooksController.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/books',BooksController);

const port=4500;
connect();
app.listen(port,()=>{
    console.log('App listening on port: '+port);
});