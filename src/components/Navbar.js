import { Link } from 'react-router-dom';
import styles from '../styles/navbar.module.css';
const Navbar = () => {
    return (
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <Link to="/">
                    <img alt='logo' src='https://tse2.mm.bing.net/th?id=OIP.ULrKBWOLrvVGcwWI0VOcuQHaDo&pid=Api&P=0&h=180' className={styles.webappLogo} />
                </Link>
            </div>
            <div className={styles.rightNav}>
                <div className={styles.user}>
                    <Link to='/about'>
                        <img src='https://img.freepik.com/free-icon/user_318-159711.jpg?size=626&ext=jpg' alt='' className={styles.userDp } />
                    </Link>
                    <span>Rahul</span>
                </div>
                <div className={styles.navLinks}>
                    <ul>
                        <li>
                            <Link to='/login'>Log in</Link>
                        </li>
                        <li>
                            <a href='/'>Log out</a>
                        </li>
                        <li>
                            <a href="/">Register</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;