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

const App = () => {
  const { user } = useContext(UserContext)

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/request' element={<RequestOrder />} />
        <Route path='/requests' element={<Requests />} />
        <Route path='/requests/:requestId/edit' element={<EditRequest />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
      </Routes>
    </>
  );
};

export default App;
