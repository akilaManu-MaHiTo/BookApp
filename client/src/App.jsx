import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import BookStore from './views/BookStore';
import Test from './views/Test';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BookStore />} />
        <Route path='/Test' element={<Test />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
