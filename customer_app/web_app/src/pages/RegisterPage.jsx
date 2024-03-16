import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { NavBar, Link } from '@components/core';
import { pages } from '@pages';
import { authActions } from '@actions';

import styles from '@styles';

const RegisterPage = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const register = useSelector(state => state.authService.register);
  useEffect(() => {
    if (register) {
      navigate(pages.LOGIN_PAGE.path, { state: { from: location }});
    }
  }, [register]);
  const [user, setUser] = useState({
    email: '',
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
    email: false,
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
    dispatch(authActions.registerUser(user.email, user.username, user.password));
    // register + navigate.
  };
  const form = (
    <form onSubmit={handleSubmit}>
      <div className={styles.authFormSection}>
        <label className={styles.authInputLabel}>Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          onFocus={() => handleInputFocus('email')}
          onBlur={() => handleInputBlur('email')}
          className={isClicked.email ? `${styles.authInput} ${styles.authInputClicked}` : `${styles.authInput}`}
          autoComplete="off"
          required/>
      </div>
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
      <button type="submit" className={styles.authButton}>Register</button>
    </form>
  );
  
  return (
    <div className={styles.container}>
      <NavBar/>
      <div className={styles.authFormContainer}>
        {form}
        <p className={styles.authLinkMsg}>
          Already have an account?{' '}
          <Link
            to={pages.LOGIN_PAGE.path}
            className={styles.authLink}
          >Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
