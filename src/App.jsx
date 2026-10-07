import { Route, Routes, useNavigate } from 'react-router';
import './App.css'

// Components
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing'

// Context
import RequestOrder from './components/RequestOrder/RequestOrder';
import Requests from './components/Requests/Requests';
import Orders from './components/Orders/Orders';
import Gallery from './components/Gallery/Gallery';
import PostForm from './components/PostForm/PostForm';
import PostDetials from './components/PostDetails/PostDetails';
import EditPost from './components/EditPost/EditPost';
import { useEffect, useState } from 'react';
import postService from './services/postService';
import Footer from './components/Footer/Footer';

const App = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const posts = await postService.getAllPosts()
        setPosts(posts)
      }
      catch (err) { console.log(err.message) }
    }
    getAllPosts()
  }, [])

  const handleDeletePost = async (postId) => {
    try {
      await postService.deletePost(postId)
      setPosts(posts.filter((post) => post._id !== postId))
      navigate('/posts')
    }
    catch (err) { console.log(err.message) }
  }
  return (
    <div className="app">

      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/request' element={<RequestOrder />} />
          <Route path='/requests' element={<Requests />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/posts' element={<Gallery />} />
          <Route path='/posts/new' element={<PostForm />} />
          <Route path='/posts/:postId' element={<PostDetials handleDeletePost={handleDeletePost} />} />
          <Route path='/posts/:postId/edit' element={<EditPost />} />
          <Route path='/sign-up' element={<SignUpForm />} />
          <Route path='/sign-in' element={<SignInForm />} />
        </Routes>
      </main>
      <Footer />
    </div>

  );
};

export default App;
