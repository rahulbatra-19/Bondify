import { useState } from 'react';
import { useAuth } from '../hooks';
import { toast } from 'react-toastify';
import styles from '../styles/settings.module.css';
const Settings = () => {
  const auth = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(auth.user?.name ? auth.user.name : '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingForm, setSavingForm] = useState(false);

  const editing = () => {
    setEditMode(!editMode);
  };
  const clearForm = () => {
    setPassword('');
    setConfirmPassword('');
  };
  const updateProfile = async () => {
    setSavingForm(true);
    let error = false;
    if (!name || !password || !confirmPassword) {
      toast.error('Please fill all the fields!!');
      error = true;
    }
    if (password !== confirmPassword) {
      toast.error("Password and confirm password don't match ");
      error = true;
    }
    if (error) {
      return setSavingForm(false);
    }
    const response = await auth.updateUser(
      auth.user._id,
      name,
      password,
      confirmPassword
    );
    if (response.success) {
      setEditMode(false);
      setSavingForm(false);
      clearForm();
      toast.success('User updated successfully');
    } else {
      toast.error(response.message);
    }
    setSavingForm(false);
  };
  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://img.freepik.com/free-icon/user_318-159711.jpg?size=626&ext=jpg"
          alt=""
          className={styles.userDp}
        />
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editMode ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <div className={styles.fieldValue}>{auth.user?.name}</div>
        )}
      </div>
      {editMode && (
        <>
          {' '}
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </>
      )}

      {editMode ? (
        <div className={styles.btnGrp}>
          <button
            onClick={updateProfile}
            className={`button ${styles.saveBtn}`}
            disabled={savingForm}
          >
            {savingForm ? 'Saving profile...' : 'Save Profile'}
          </button>
          <button onClick={editing} className={`button ${styles.editBtn}`}>
            Go Back
          </button>
        </div>
      ) : (
        <div className={styles.btnGrp}>
          <button onClick={editing} className={`button ${styles.editBtn}`}>
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Settings;
