import styles from '../styles/home.module.css';
import Comment from '../components/Comment';
import { useState, useEffect } from 'react';
import Loader from '../components/loader';
import { Link } from 'react-router-dom';
import { useAuth, usePosts } from '../hooks';
import FriendsList from '../components/FriendList';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  const posts = usePosts();
  if (posts.loading) {
    return <Loader />;
  }
  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
        {posts.data.map((post) => (
          <Post post={post} key={`post-${post._id}`} />
        ))}
      </div>
      {auth.user && <FriendsList />}
    </div>
  );
};