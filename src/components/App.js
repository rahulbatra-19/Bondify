import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getPosts } from '../api';
import { Home, Login, Signup, Settings } from '../pages';
import Loader from './loader';
import Navbar from './Navbar';
import { useAuth } from '../hooks';

const Page404 = () => {
  return <h1>404</h1>;
};
function App() {
  const auth = useAuth;
  if (auth.loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="*" element={<Page404 />}></Route>
      </Routes>
    </div>
  );
}

export default App;
