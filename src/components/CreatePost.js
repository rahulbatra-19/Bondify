import { useState } from 'react';
import styles from '../styles/home.module.css';
import { addPost } from '../api';
import { toast } from 'react-toastify';
import { usePosts } from '../hooks';

const CreatePost = () => {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);
  const posts = usePosts();

  const handleAddPostClick = async () => {
    setAddingPost(true);

    const response = await addPost(post);
    if (response.success) {
      setPost('');
      posts.addPostToState(response.data.post);
      toast.success('Post created SuccessFully');
    } else {
      toast.error(response.message);
    }
    setAddingPost(false);
  };
  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        value={post}
        placeholder="What are you thinking? "
        onChange={(e) => {
          setPost(e.target.value);
        }}
      />
      <div>
        <button
          className={styles.addPostBtn}
          onClick={handleAddPostClick}
          disabled={addingPost}
        >
          {addingPost ? 'Adding post ... ' : 'Add post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
