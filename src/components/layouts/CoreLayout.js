import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import './styles.css';

export const CoreLayout = ({ children }) => (
  <div className="container text-center">
    <Header className="core-layout__header" />
    <div className="core-layout__viewport">
      {children}
    </div>
    <Footer className="core-layout__footer" />
  </div>
);

CoreLayout.propTypes = {
  children : PropTypes.element.isRequired
};

export default CoreLayout;
