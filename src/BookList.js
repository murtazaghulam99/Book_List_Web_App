import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@material-ui/core';
import { Book as BookIcon } from '@material-ui/icons';


function BookList() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=react');
            setBooks(response.data.items);
        };
        
        fetchBooks();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><BookIcon /></TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell>Published</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map(book => (
                        <TableRow key={book.id}>
                            <TableCell><BookIcon /></TableCell>
                            <TableCell>{book.volumeInfo.title}</TableCell>
                            <TableCell>{book.volumeInfo.authors?.join(', ')}</TableCell>
                            <TableCell>{book.volumeInfo.publishedDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default BookList;
