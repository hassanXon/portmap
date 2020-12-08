import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import SideBar from '../SideBar/index';

import './styles.css';

export const CoreLayout = ({ children }) => (
  <div className="text-center">
    <Header className="core-layout__header" />
    <SideBar />
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
