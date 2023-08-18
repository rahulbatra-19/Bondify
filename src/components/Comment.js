import Proptypes from 'prop-types';
import styles from '../styles/home.module.css';

const Comment = ({ comment }) => {
  return (
    <div className={styles.postCommentItem}>
      <div className={styles.postCommentHeader}>
        <span className={styles.postCommentAuthor}>{comment.user.name}</span>
        <span className={styles.postCommentTime}>
          {Math.floor((new Date() - new Date(comment.createdAt)) / 3600000) ==
          -1
            ? 0
            : Math.floor((new Date() - new Date(comment.createdAt)) / 3600000)}
          &nbsp; Hours
        </span>
        <span className={styles.postCommentLikes}>{comment.likes.length}</span>
      </div>
      <div className={styles.postCommentContent}>{comment.content}</div>
    </div>
  );
};

Comment.propTypes = {
  comment: Proptypes.object.isRequired,
};

export default Comment;
