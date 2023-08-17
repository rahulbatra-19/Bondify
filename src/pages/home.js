import { PropTypes } from 'prop-types';
import styles from '../styles/home.module.css';
import Comment from '../components/Comment';
import { getPosts } from '../api';
import { useState, useEffect } from 'react';
import Loader from '../components/loader';
import { Link } from 'react-router-dom';

export const Home = () => {
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
    };
    fetchPosts();
  }, []);
  if (loading) {
    return <Loader />;
  }
  console.log(posts);
  return (
    <div className={styles.postsList}>
      {posts.map((post) => (
        <div className={styles.postWrapper} key={`post-${post._id}`}>
          <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
              <img
                src="https://img.freepik.com/free-icon/user_318-159711.jpg?size=626&ext=jpg"
                alt="user-pic"
              />
              <div>
                <Link
                  to={`/user/${post.user._id}`}
                  className={styles.postAuthor}
                >
                  {post.user.name}
                </Link>
                <span className={styles.postTime}>
                  {Math.floor(
                    (new Date() - new Date(post.createdAt)) / 3600000
                  )}
                  &nbsp; Hours
                </span>
              </div>
            </div>
            <div className={styles.postContent}>{post.content}</div>
            <div className={styles.postActions}>
              <div className={styles.postLike}>
                <img
                  src="https://img.icons8.com/?size=2x&id=16076&format=png"
                  alt=""
                />
                <span>{post.likes.length}</span>
              </div>
              <div className={styles.postCommentsIcon}>
                <img
                  src="https://img.icons8.com/?size=2x&id=jOjH1Mt48Fp1&format=png
                    "
                  alt="comments-icon"
                />
                <span>{post.comments.length}</span>
              </div>
            </div>
            <div className={styles.postCommentBox}>
              <input placeholder="Start typing a comment" />
            </div>
            <div className={styles.postCommentList}>
              {post.comments.map((comment) => (
                <Comment comment={comment} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Home.propTypes = {
//   posts: PropTypes.array.isRequired,
// };
