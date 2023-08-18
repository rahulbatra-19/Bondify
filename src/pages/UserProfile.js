import { Navigate, redirect, useLocation, useParams } from 'react-router-dom';
import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';
import {
  addFriend,
  fetchUserFriends,
  fetchUserProfile,
  removeFriend,
} from '../api';
import { toast } from 'react-toastify';
import Loader from '../components/loader';

const UserProfile = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isfriend, setIsFriend] = useState();
  const [requestInProgress, setRequestInProgress] = useState(false);
  const { userId } = useParams();
  // console.log(userId);
  const auth = useAuth();
  console.log(user);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);
      // console.log(response);
      if (response.success) {
        setUser(response.data.user);
      } else {
        toast.error('No user found');
        return <Navigate to="/" />;
      }
      setLoading(false);
    };
    getUser();
  }, [userId, isfriend]);

  if (loading) {
    return <Loader />;
  }

  const areFriends = () => {
    const friends = auth.user.friends;
    // console.log(, auth.user.friends);
    const friendIds = friends.map((friend) => friend.to_user._id);
    const contains = friendIds.includes(userId);
    return contains;
  };

  const handleRemoveFriendClick = async () => {
    setRequestInProgress(true);
    const response = await removeFriend(userId);
    console.log('remove Friend', response);
    if (response.success) {
      const friendship = auth.user.friends.filter(
        (friend) => friend.to_user._id === userId
      );

      auth.updateUserFriends(false, friendship[0]);
      toast.success('Friend removed Succssfully');
    } else {
      toast.error(response.message);
    }
    setRequestInProgress(false);
  };

  const handleAddFriendClick = async () => {
    setRequestInProgress(true);
    const response = await addFriend(userId);
    console.log('Add frined', response);
    if (response.success) {
      const { friendship } = response.data;
      auth.updateUserFriends(true, friendship);
      toast.success('Friend added Succssfully');
    } else {
      toast.error(response.message);
    }
    setRequestInProgress(false);
  };
  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://img.freepik.com/free-icon/user_318-159711.jpg?size=626&ext=jpg"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {areFriends() ? (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleRemoveFriendClick}
            disabled={requestInProgress}
          >
            {requestInProgress ? 'Removing friend ... ' : 'Remove friend'}
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleAddFriendClick}
            disabled={requestInProgress}
          >
            {requestInProgress ? 'Adding Friend ...' : 'Add friend'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
