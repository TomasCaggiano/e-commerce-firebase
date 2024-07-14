import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import './NavBar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false); // Cerrar el menú si el ancho es mayor a 768px
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className='navBar'>
      <Link to='/'>
        Home
      </Link>
      <FaBars className='menuIcon' onClick={toggleMenu} />
      <div className={`menuItems ${isOpen ? 'active' : ''}`}>
        <NavLink to='/category/placa de video'>placa de video</NavLink>
        <NavLink to='/category/ram'>ram</NavLink>
        <NavLink to='/category/motherboard'>motherboard</NavLink>
        <NavLink to='/category/gabinete'>gabinete</NavLink>
        <NavLink to='/category/ssd'>ssd</NavLink>
      </div>
        <NavLink to='/cart'>cart</NavLink>
    </header>
  );
};

export default NavBar;
