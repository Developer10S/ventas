import React from 'react';
import Hearder from './Hearder';
import Menu from './Menu';

const Layout = () => {
  return (
    <div>     
        <Hearder/>   
        <div className="container">
            <div className="columns">
                <div className="column is-one-quarter">
                    <Menu/>
                </div>
                <div className="column">

                </div>
            </div>
        </div>
    </div>
  );
}

export default Layout
