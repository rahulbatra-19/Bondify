import { useEffect, useState } from 'react';
import { Route, Routes, redirect } from 'react-router-dom';
import { getPosts } from '../api';
import { Home, Login, Signup, Settings, UserProfile } from '../pages';
import Loader from './loader';
import Navbar from './Navbar';
import { useAuth } from '../hooks';

function PrivateRoute() {
  const auth = useAuth();
  if (auth.user) {
    return <Settings />;
  } else {
    return <Login />;
  }
}
function PrivateRouteUSer() {
  const auth = useAuth();
  if (auth.user) {
    return <UserProfile />;
  } else {
    return <Login />;
  }
}

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
        <Route path="/settings" element={<PrivateRoute />}></Route>
        <Route path="*" element={<Page404 />}></Route>
        <Route path="/user/:userId" element={<PrivateRouteUSer />}></Route>
      </Routes>
    </div>
  );
}

export default App;
