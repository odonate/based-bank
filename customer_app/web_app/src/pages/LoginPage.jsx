import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { NavBar, Link } from '@components/core';
import { pages } from '@pages';
import { authActions } from '@actions';

import styles from '@styles';

const LoginPage = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const login = useSelector(state => state.authService.login);
  useEffect(() => {
    if (login && login.userId != undefined) {
      navigate(pages.DASHBOARD_PAGE.path, { state: { from: location }});
    }
  }, [login]);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };  
  const [isClicked, setIsClicked] = useState({
    username: false,
    password: false,
  });
  const handleInputFocus = (name) => {
    setIsClicked((prevIsClicked) => ({
      ...prevIsClicked,
      [name]: true,
    }));
  };
  const handleInputBlur = (name) => {
    setIsClicked((prevIsClicked) => ({
      ...prevIsClicked,
      [name]: false,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    dispatch(authActions.loginUser(user.username, user.password));
    // setUser({
    //   username: '',
    //   password: '',
    // });
    // login + navigate.
  };
  const form = (
    <form onSubmit={handleSubmit}>
      <div className={styles.authFormSection}>
        <label className={styles.authInputLabel}>Username</label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          onFocus={() => handleInputFocus('username')}
          onBlur={() => handleInputBlur('username')}
          className={isClicked.username ? `${styles.authInput} ${styles.authInputClicked}` : `${styles.authInput}`}
          autoComplete="off"
          required/>
      </div>
      <div className={styles.authFormSection}>
        <label className={styles.authInputLabel}>Password</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          onFocus={() => handleInputFocus('password')}
          onBlur={() => handleInputBlur('password')}
          className={isClicked.password ? `${styles.authInput} ${styles.authInputClicked}` : `${styles.authInput}`}
          autoComplete="off"
          required/>
      </div>
      <button type="submit" className={loading ? styles.authButtonLoading : styles.authButton}>
        {loading ? <div/> : 'Log In'}
      </button>
    </form>
  );

  return (
    <div className={styles.container}>
      <NavBar/>
      <div className={styles.authFormContainer}>
        {form}
        <p className={styles.authLinkMsg}>
          Need an account?{' '}
          <Link
            to={pages.REGISTER_PAGE.path}
            className={styles.authLink}
          >Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
