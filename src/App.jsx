import { useState } from 'react'
import './App.css'
import Card from './components/card'
import Navbar from './components/navbar'
import Register from './components/register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Register />;

    </>
  )
}

export default App
