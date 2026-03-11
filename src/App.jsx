import './App.css'
import Home from './components/Home'
import Register from './components/register'
import Login from './components/login'
import Card from './components/card'

function App() {
  const path = window.location.pathname.toLowerCase()

  if (path === '/register') {
    return <Register />
  }

  if (path === '/login') {
    return <Login />
  }
if(path==='/card'){
  return <Card/>
}
  return (
    <Home />
  )
}

export default App
