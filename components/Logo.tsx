import React from 'react';
import Book from './icons/Book';

function Logo() {
  return <div className='flex gap-2 items-center'>
<h1 className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent'>SimpleNotes</h1>
<Book color='#BA7CF8'/>
  </div> 
}

export default Logo
