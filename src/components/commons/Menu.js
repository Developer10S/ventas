import React from 'react'

const Menu = () => {
  return (
    <nav className="panel">
        <p className='panel-heading'>Menu</p>
        <div className='panel-block'>
            <a href='/'className='button is-fullwidth'>
                <span className='icon'>
                <i className='fas fa-home'></i>
                </span>
               <span>Inicio</span>                
            </a>            
        </div>
        <div className='panel-block'>
            <a href='/'className='button is-fullwidth'>
                <span className='user'>
                <i className='fas fa-home'></i>
                </span>
               <span>Usuarios</span>                
            </a>            
        </div>
    </nav>    
  )
}

export default Menu
