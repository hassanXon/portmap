import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.css';

const Header = ({ className }) => (
  <div className={className}>
    <h1>Expero Shipping Planner</h1>
    <Link to="/" className="route--active">
      Home
    </Link>
    {/*
    {' · '}
    <Link to="/counter" className="route--active">
      Counter
    </Link>
     */}
  </div>
);

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
