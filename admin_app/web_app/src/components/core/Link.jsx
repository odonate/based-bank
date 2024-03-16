import React from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';

import styles from '@styles';

const Link = ({ to, state, className, onClick, external, ...rest }) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (external) {
    const linkProps = {
      href: to,
      target: "_blank",
      rel: "noopener noreferrer",
      className: className ? className : styles.button,
      ...rest,
    };

    return <a {...linkProps} />;
  }
  
  const linkProps = {
    to: {
      pathname: to,
      state: { from: location, ...state },
    },
    className: className ? className : styles.button,
    ...rest,
  };

  return (
    <RouterLink {...linkProps} />
  );
};

export { Link };
