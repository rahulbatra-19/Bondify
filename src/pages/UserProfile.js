import { Navigate,redirect, useLocation, useParams } from 'react-router-dom';
import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';
import { fetchUserProfile } from '../api';
import { toast } from 'react-toastify';
import Loader from '../components/loader';


const UserProfile = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  console.log(userId);
  const auth = useAuth();


  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);
      console.log(response);
      if (response.success) {
        setUser(response.data.user);
      } else {
        toast.error('No user found');
        return <Navigate to ="/" />
      }
        setLoading(false);
    }
    getUser();
  }, [userId]);

  if (loading) {
    return (
      <Loader />
    )
  }

  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friendships;
    const friendIds = friends.map((friend) => friend.to_user.id);
    const index = friendIds.indexOf(userId);

    if (index !== -1) {
      return true;
    }

    return false;
  }
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
        {checkIfUserIsAFriend() ? (
          <button className={`button ${styles.saveBtn}`} onClick={() => {}}>Remove friend</button>
        ) : (
          <button className={`button ${styles.saveBtn}`} >Add friend</button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
