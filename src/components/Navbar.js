import { Link } from 'react-router-dom';
import styles from '../styles/navbar.module.css';
import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';
import { searchUsers } from '../api';
const Navbar = () => {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const auth = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await searchUsers(searchText);
      if (response.success) {
        setResults(response.data.users);
      }
    };
    if (searchText.length > 1) {
      fetchUsers();
    } else {
      setResults([]);
    }
  }, [searchText]);
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt="logo"
            src="https://tse2.mm.bing.net/th?id=OIP.ULrKBWOLrvVGcwWI0VOcuQHaDo&pid=Api&P=0&h=180"
            className={styles.webappLogo}
          />
        </Link>
      </div>
      {auth.user &&
        (<div className={styles.searchContainer}>
          <img
            className={styles.searchIcon}
            src="https://img.icons8.com/?size=512&id=12773&format=png"
            alt="search-maginfy"
          />
          <input
            placeholder="Search users"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          {results.length > 0 && (
            <div className={styles.searchResults}>
              <ul>
                {results.map((user) => (
                  <li
                    className={styles.searchResultsRow}
                    key={`user-${user._id}`}
                  >
                    <Link
                      to={`/user/${user._id}`}
                      onClick={() => {
                        setSearchText('');
                      }}
                    >
                      <img
                        src="https://img.freepik.com/free-icon/user_318-159711.jpg?size=626&ext=jpg"
                        alt="user-pic"
                      />
                      <span> {user.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              
            </div>
          )}
        </div>
        )}
      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                src="https://img.freepik.com/free-icon/user_318-159711.jpg?size=626&ext=jpg"
                alt=""
                className={styles.userDp}
              />
            </Link>
            <span>{auth.user.name}</span>
          </div>
        )}
        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <li onClick={auth.logout}>Log out</li>
            ) : (
              <>
                <li>
                  <Link to="/login">Log in</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
