import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getPosts } from '../api';
import { Home,Login } from '../pages';
import Loader from "./loader";
import Navbar from "./Navbar";

const About = () => {
  return <h1>About</h1>
}

const UserInfo = () => {
  return <h1>User</h1>;
};

const Page404 = () => {
  return <h1>404</h1>;
} 
function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      console.log(response.data);
      if (response.success) {
        setPosts(response.data.posts);
      }
      setLoading(false);
    console.log('response', response);
    }
    fetchPosts();
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home posts={posts} />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/user/:id" element={<UserInfo />}></Route>
        <Route path="*" element={<Page404 />}></Route>
      </Routes>
    </div>
  );
}

export default App;
