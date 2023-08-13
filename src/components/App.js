import { useEffect, useState } from "react";
import { getPosts } from '../api';
import { Home } from '../pages';
import Loader from "./loader";
import Navbar from "./Navbar";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
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
      <Home posts={posts } />
    </div>
  );
}

export default App;
