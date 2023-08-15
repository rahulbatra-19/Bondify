import { PropTypes } from 'prop-types';
import styles from '../styles/home.module.css';
import Comment from '../components/Comment';
export const Home = ({ posts }) => {
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
                <span className={styles.postAuthor}>{post.user.name}</span>

                <span className={styles.postTime}>
                  {Math.floor(
                    (new Date() - new Date(post.createdAt)) / (3600000)
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

Home.propTypes = {
  posts: PropTypes.array.isRequired,
};
