import { useContext } from 'react';
import { Route, Routes } from 'react-router';
import './App.css'

// Components
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Dashboard from './components/Dashboard/Dashboard'
import Landing from './components/Landing/Landing'

// Context
import { UserContext } from './contexts/UserContext';
import RequestOrder from './components/RequestOrder/RequestOrder';
import Requests from './components/Requests/Requests';
import EditRequest from './components/EditRequest/EditRequest';
import Orders from './components/Orders/Orders';
import Gallery from './components/Gallery/Gallery';
import PostForm from './components/PostForm/PostForm';

const App = () => {
  const { user } = useContext(UserContext)

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/request' element={<RequestOrder />} />
        <Route path='/requests' element={<Requests />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/posts' element={<Gallery />} />
        <Route path='/posts/new' element={<PostForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
      </Routes>
    </>
  );
};

export default App;
