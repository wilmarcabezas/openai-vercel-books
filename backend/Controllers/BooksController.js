import express from 'express';
import BookService from '../Services/BooksService.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const books = await BookService.getBooks();
    res.status(200).json(books);
})

router.get('/:name',async(req,res)=>{
    const result = await BookService.getBooksByName(req.params.name);
    res.status(200).json(result);
})

router.post('/',async (req, res) => {
    await BookService.saveBook(req.body)
    res.status(201).json({message: 'Book saved successfully'});
})


export default router;