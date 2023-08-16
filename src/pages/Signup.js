import { useState } from 'react';
import styles from '../styles/login.module.css';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks';
import { useNavigate , Navigate } from 'react-router-dom';

const Signup = () => {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      const [signingUp, setSigningUp] = useState('');
  const auth = useAuth();

  const history = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSigningUp(true);

    let error = false;
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please Fill in the fields');
      error = true;
    }
    if (password !== confirmPassword) {
      toast.error('Make sure password and confirm passsword matches');
      error = true;
    }
    if (error) {
      return setSigningUp(false);
    }
    const response = await auth.signup(name, email, password, confirmPassword);
    console.log(response);

    if (response.success) {
      toast.success('User registered successfully, please login now');
      history('/login');
      setSigningUp(false);
    } else {
      toast.error(response.message);
    }

    setSigningUp(false);
  };
  if (auth.user) {
    return <Navigate to="/"/>
  }
  return (
    <form className={styles.loginForm} onSubmit={handleFormSubmit}>
      <span className={styles.loginSignupHeader}> Signup</span>
      <div className={styles.field}>
        <input
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Confirm password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <button disabled={signingUp}>
          {signingUp ? 'Signing up...' : 'Signup'}
        </button>
      </div>
    </form>
  );
};

export default Signup;
