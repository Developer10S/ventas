import React from 'react';
import { Link } from 'react-router-dom'

const Hearder = () => {
  return (
    <div className="navbar is-primary">
        <div className="navbar-brand">
            <Link to  ='/' className='navbar-item'>
                <img src="Logos.svg.png"alt='Logo'/>
            </Link>
        </div>
    </div>
  )
}

export default Hearder
