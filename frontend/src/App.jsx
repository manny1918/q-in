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
import Service from './pages/Service';
import Users from './pages/Users';
import ViewUser from './pages/ViewUser';
import EditUser from './pages/EditUser';
import TakeTurn from './pages/TakeTurn';
import Turn from './pages/Turn';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/take-turn' element={<TakeTurn />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Home />} />
            <Route path='/new-service' element={<PrivateRoute />}>
              <Route path='/new-service' element={<NewService />} />
            </Route>
            <Route path='/services' element={<PrivateRoute />}>
              <Route path='/services' element={<Services />} />
            </Route>
            <Route path='/services/:serviceId' element={<PrivateRoute />}>
              <Route path='/services/:serviceId' element={<Service />} />
            </Route>
            <Route path='/users' element={<PrivateRoute />}>
              <Route path='/users' element={<Users />} />
            </Route>
            <Route path='/users/:userId' element={<PrivateRoute />}>
              <Route path='/users/:userId' element={<ViewUser />} />
            </Route>
            <Route path='/users/edit/:userId' element={<PrivateRoute />}>
              <Route path='/users/edit/:userId' element={<EditUser />} />
            </Route>
            <Route path='/turn' element={<PrivateRoute />}>
              <Route path='/turn' element={<Turn />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
