import styles from '../styles/home.module.css';
import Comment from '../components/Comment';
import { useState, useEffect } from 'react';
import Loader from '../components/loader';
import { Link } from 'react-router-dom';
import { useAuth, usePosts } from '../hooks';
import FriendsList from '../components/FriendList';
import CreatePost from '../components/CreatePost';

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
      {auth.user && <FriendsList />}
    </div>
  );
};