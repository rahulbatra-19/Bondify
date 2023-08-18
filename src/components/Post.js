import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/home.module.css';
import { usePosts } from '../hooks';
import { createComment } from '../api';
import { toast } from 'react-toastify';
import Comment from './Comment';

const Post = ({ post }) => {
  const [comment, setComment] = useState('');
  const [creatingComment, setCreatingComment] = useState(false);
  const posts = usePosts();

  const handleAddComment = async (e) => {
    if (e.key === 'Enter') {
      setCreatingComment(true);
      const response = await createComment(comment, post._id);

      if (response.success) {
        setComment('');
        posts.addComment(response.data.comment, post._id);
        toast.success('Comment Created Succesfully');
      } else {
        toast.error(response.message);
      }

      setCreatingComment(false);
    }
  };

  return (
    <div className={styles.postWrapper} key={`post-${post._id}`}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://img.freepik.com/free-icon/user_318-159711.jpg?size=626&ext=jpg"
            alt="user-pic"
          />
          <div>
            <Link to={`/user/${post.user._id}`} className={styles.postAuthor}>
              {post.user.name}
            </Link>
            <span className={styles.postTime}>
              {Math.floor(
                (new Date() - new Date(post.createdAt)) / 3600000
              ) == -1
                ? 0
                : Math.floor(
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
          <input
            placeholder="Start typing a comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            onKeyDown={handleAddComment}
          />
        </div>
        <div className={styles.postCommentList}>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={`post-comment-${comment._id}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
