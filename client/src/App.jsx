import { useState } from 'react'
import './App.css'

import PostList from './components/PostList';
import PostForm from './components/PostForm';

function App() {
  return (
    <>
      <PostForm />
      <PostList />
    </>
  )
}

export default App
