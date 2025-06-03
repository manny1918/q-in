import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';
import NewService from './pages/NewService';
import PrivateRoute from './components/PrivateRoute';
import Services from './pages/Services';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Home />} />
            <Route path='/new-service' element={<PrivateRoute />}>
              <Route path='/new-service' element={<NewService />} />
            </Route>
            <Route path='/services' element={<PrivateRoute />}>
              <Route path='/services' element={<Services />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
