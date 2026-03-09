import './App.css'
import Home from './components/Home'
import Register from './components/register'
import Login from './components/login'

function App() {
  const path = window.location.pathname.toLowerCase()

  if (path === '/register') {
    return <Register />
  }

  if (path === '/login') {
    return <Login />
  }

  return (
    <Home />
  )
}

export default App
