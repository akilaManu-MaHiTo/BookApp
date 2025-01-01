import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import BookStore from './views/BookStore';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BookStore />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
