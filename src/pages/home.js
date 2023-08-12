import styles from '../styles/home.module.css';
export const Home = ({ posts }) => {
    return (
        <div className={styles.postsList}>
            {posts.map((post) =>(

            <div className={styles.postWrapper}>
                <div className={styles.postHeader}>
                    <div className={styles.postAvatar}>
                        <img src="https://img.freepik.com/free-icon/user_318-159711.jpg?size=626&ext=jpg"
                            alt="user-pic"
                        />
                   <div>
                                <span className={styles.postAuthor}>{post.user.name}</span>
                    <span className={styles.postTime}> a minute ago</span>
                </div>
            </div>
                        <div className={styles.postContent}>{ post.content}</div>
            <div className={styles.postActions}>
                <div className={styles.postLike}>
                    <img src="https://img.icons8.com/?size=2x&id=16076&format=png"
                        alt="" />
                    <span>5</span>
                </div>
                <div className={styles.postCommentsIcon}>
                    <img src="https://img.icons8.com/?size=2x&id=jOjH1Mt48Fp1&format=png
                    "
                        alt="comments-icon"
                    />
                    <span>2</span>
                </div>
            </div>
            <div className={styles.postCommentBox}>
                <input placeholder="Start typing a comment"/>
            </div>
            <div className={styles.postCommentList}>
                <div className={styles.postCommentItem}>
                    <div className={styles.postCommentHeader}>
                        <span className={styles.postCommentAuthor}>Bill</span>
                        <span className={styles.postCommentTime}>a minute ago</span>
                        <span className={styles.postCommentLikes}>22</span>
                    </div>

                    <div className={styles.postCommentContent}> Random comment</div>
                </div>
            </div>
                </div>
            </div>
            ))}
            </div>
                
    );
};
