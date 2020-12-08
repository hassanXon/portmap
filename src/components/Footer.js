import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ className }) => (
  <div className={className}>
    This application is brought to you by Expero
  </div>
);

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
