import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Header from './components/Header'

function App() {
  return <>
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </Router>
    <ToastContainer/>
  </>
}

export default App
